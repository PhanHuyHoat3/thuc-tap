    import { NextRequest, NextResponse } from "next/server";

    let products = []; // Lưu demo, nên dùng DB thực tế

    export async function POST(request: NextRequest) {
    const body = await request.json();
    // TODO: validate input

    // Tạo sản phẩm mới, giả lập id
    const newProduct = { id: Date.now().toString(), ...body };
    products.push(newProduct);

    return NextResponse.json(newProduct);
    }
