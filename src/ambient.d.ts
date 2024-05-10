import type { Margins, PredefinedPageSize } from 'pdfmake/interfaces';

type UserInfo = {
	firstName: string;
	lastName: string;
	email: string;
};

type PageSettings = {
	margins: Margins;
	size: PredefinedPageSize;
	orientation: 'portrait' | 'landscape';
};
