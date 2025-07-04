    import NextAuth from "next-auth";
    import CredentialsProvider from "next-auth/providers/credentials";

    const handler = NextAuth({
    providers: [
        CredentialsProvider({
        name: "Credentials",
        credentials: {
            email: { label: "Email", type: "email" },
            password: { label: "Password", type: "password" },
        },
        async authorize(credentials) {
            // Ví dụ kiểm tra user trong database thật (ở đây hardcode)
            if (
            credentials?.email === "admin@example.com" &&
            credentials?.password === "admin123"
            ) {
            return { id: "1", name: "Admin User", email: "admin@example.com", role: "admin" };
            }
            if (
            credentials?.email === "user@example.com" &&
            credentials?.password === "user123"
            ) {
            return { id: "2", name: "Normal User", email: "user@example.com", role: "user" };
            }
            return null;
        },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user }) {
        if (user) {
            token.role = user.role; // gán role vào token
        }
        return token;
        },
        async session({ session, token }) {
        if (token && session.user) {
            session.user.role = token.role as string; // gán role cho session
        }
        return session;
        },
    },
    pages: {
        signIn: "/login",
    },
    });

    export { handler as GET, handler as POST };
