import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from '$env/static/private';
import { DrizzleSQLiteAdapter } from '@lucia-auth/adapter-drizzle';
import { GitHub } from 'arctic';
import { Lucia } from 'lucia';
import { db } from './db';
import { session, user } from './db/schema/user';
import type { Cookies } from '@sveltejs/kit';

const adapter = new DrizzleSQLiteAdapter(db, session, user);

export const github = new GitHub(GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET);

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			secure: process.env.NODE_ENV === 'production'
		}
	},
	getUserAttributes: (data) => {
		return {
			firstName: data.firstName,
			lastName: data.lastName,
			email: data.email,
			role: data.role,
			access: data.access,
			avatarUrl: data.avatarUrl
		};
	}
});

export async function allowUser(cookies: Cookies, role?: string, access?: string) {
	const sessionId = cookies.get(lucia.sessionCookieName);
	if (!sessionId) return false;

	const { user } = await lucia.validateSession(sessionId);

	if (!user) return false;

	if (role && user.role !== role) return false;

	if (access && user.access) {
		const userAccess = JSON.parse(user.access);
		if (!userAccess.includes(access)) return false;
	}

	return true;
}

declare module 'lucia' {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: {
			firstName: string;
			lastName: string;
			role: string;
			access: string;
			email: string;
			avatarUrl: string;
		};
	}
}
