export declare interface MockData {
	name: string;
	image: string;
	description: string;
	dateLastEdited: string;
}

export declare interface SortObject {
	type: string;
	value: number;
}

export declare interface ResponseBody {
	body: { payload: { data: MockData[]; total: number }; message: string };
}
