    // src/components/BookForm.jsx
    import { useState } from 'react';
    import { useMutation, useQuery } from '@apollo/client';
    import { useParams, useNavigate } from 'react-router-dom';
    import { CREATE_BOOK, UPDATE_BOOK, GET_BOOK, GET_BOOKS } from '../graphql/queries';
    import styles from '../styles/BookForm.module.css';

    function BookForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEdit = !!id;

    const [formData, setFormData] = useState({
        title: '',
        author: '',
        publishedYear: '',
    });
    const [success, setSuccess] = useState(false);

    const { data, loading: queryLoading } = isEdit
        // eslint-disable-next-line react-hooks/rules-of-hooks
        ? useQuery(GET_BOOK, { variables: { id } })
        : { data: null, loading: false };

    const [createBook, { loading: createLoading, error: createError }] = useMutation(CREATE_BOOK, {
        refetchQueries: [{ query: GET_BOOKS }],
        onCompleted: () => { setSuccess(true); setTimeout(() => navigate('/'), 2000); },
    });

    const [updateBook, { loading: updateLoading, error: updateError }] = useMutation(UPDATE_BOOK, {
        refetchQueries: [{ query: GET_BOOKS }, { query: GET_BOOK, variables: { id } }],
        onCompleted: () => { setSuccess(true); setTimeout(() => navigate(`/books/${id}`), 2000); },
    });

    if (isEdit && data && !formData.title) {
        setFormData({
        title: data.book.title,
        author: data.book.author,
        publishedYear: data.book.publishedYear.toString(),
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const input = {
        title: formData.title,
        author: formData.author,
        publishedYear: parseInt(formData.publishedYear),
        };
        if (isEdit) await updateBook({ variables: { id, input } });
        else await createBook({ variables: { input } });
    };

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    if (queryLoading) return <div className={styles.loading}>Đang tải...</div>;

    return (
        <div className={styles.formContainer}>
        <h2>{isEdit ? 'Sửa Sách' : 'Thêm Sách Mới'}</h2>
        {success && <div className={styles.success}>Sách {isEdit ? 'đã được cập nhật' : 'đã được tạo'} thành công!</div>}
        <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.field}>
            <label>Tiêu đề</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} required />
            </div>
            <div className={styles.field}>
            <label>Tác giả</label>
            <input type="text" name="author" value={formData.author} onChange={handleChange} required />
            </div>
            <div className={styles.field}>
            <label>Năm xuất bản</label>
            <input type="number" name="publishedYear" value={formData.publishedYear} onChange={handleChange} required />
            </div>
            <button type="submit" disabled={createLoading || updateLoading} className={styles.submitButton}>
            {isEdit ? (updateLoading ? 'Đang cập nhật...' : 'Cập nhật') : (createLoading ? 'Đang tạo...' : 'Tạo')}
            </button>
        </form>
        {(createError || updateError) && <div className={styles.error}>Lỗi: {(createError || updateError).message}</div>}
        </div>
    );
    }

    export default BookForm;