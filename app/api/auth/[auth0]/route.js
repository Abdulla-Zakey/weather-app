import { NextResponse } from 'next/server';
import { cookies as nextCookies } from 'next/headers';

export async function GET(request, { params }) {
    const awaitedParams = await params;
    const action = awaitedParams?.auth0;

    const AUTH0_DOMAIN = process.env.AUTH0_ISSUER_BASE_URL;
    const CLIENT_ID = process.env.AUTH0_CLIENT_ID;
    const CLIENT_SECRET = process.env.AUTH0_CLIENT_SECRET;
    const BASE_URL = process.env.AUTH0_BASE_URL || 'http://localhost:3000';
    const REDIRECT_URI = `${BASE_URL}/api/auth/callback`;

    console.log('Auth action:', action);

    if (action === 'login') {
        const authUrl = `${AUTH0_DOMAIN}/authorize?` + new URLSearchParams({
            response_type: 'code',
            client_id: CLIENT_ID,
            redirect_uri: REDIRECT_URI,
            scope: 'openid profile email',
        });

        return NextResponse.redirect(authUrl);
    }

    if (action === 'logout') {
        const logoutUrl = `${AUTH0_DOMAIN}/v2/logout?` + new URLSearchParams({
            client_id: CLIENT_ID,
            returnTo: BASE_URL,
        });

        const response = NextResponse.redirect(logoutUrl);

        response.cookies.set({
            name: 'auth_token',
            value: '',
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 0,
            path: '/',
        });

        response.cookies.set({
            name: 'user_email',
            value: '',
            httpOnly: false,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 0,
            path: '/',
        });

        return response;
    }

    if (action === 'callback') {
    const { searchParams } = new URL(request.url);
        const code = searchParams.get('code');

        if (!code) {
            return Response.redirect(`${BASE_URL}?error=no_code`);
        }

        try {
            const tokenResponse = await fetch(`${AUTH0_DOMAIN}/oauth/token`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    grant_type: 'authorization_code',
                    client_id: CLIENT_ID,
                    client_secret: process.env.AUTH0_CLIENT_SECRET,
                    code: code,
                    redirect_uri: REDIRECT_URI,
                }),
            });

            const tokens = await tokenResponse.json();

            if (!tokens.access_token) {
                return Response.redirect(`${BASE_URL}?error=token_failed`);
            }

            // Get user info
            const userResponse = await fetch(`${AUTH0_DOMAIN}/userinfo`, {
                headers: { Authorization: `Bearer ${tokens.access_token}` },
            });

            const user = await userResponse.json();

            const response = NextResponse.redirect(BASE_URL);

            response.cookies.set({
                name: 'auth_token',
                value: tokens.access_token,
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 60 * 60 * 24 * 7, // 7 days
                path: '/',
            });

            response.cookies.set({
                name: 'user_email',
                value: user.email,
                httpOnly: false,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 60 * 60 * 24 * 7,
                path: '/',
            });

            return response;
        } catch (error) {
            console.error('Auth callback error:', error);
            return Response.redirect(`${BASE_URL}?error=auth_failed`);
        }
    }

    if (action === 'me') {
    const cookieStore = await nextCookies();
    const authToken = cookieStore.get('auth_token')?.value;
    const userEmail = cookieStore.get('user_email')?.value;

        if (!authToken || !userEmail) {
            return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
        }

        return NextResponse.json({ email: userEmail });
    }

    return NextResponse.json({ error: 'Unknown action' }, { status: 404 });
}