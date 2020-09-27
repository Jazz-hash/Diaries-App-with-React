import { Request, Response } from "miragejs";
import { handleErrors } from "../server";
import dayjs from "dayjs";

export interface DiaryResponse {
  user: User;
  diary: Diary;
}

export const create = (schema: any, req: Request): DiaryResponse | Response => {
  try {
    const { title, type, userId } = JSON.parse(req.requestBody) as Partial<
      Diary
    >;
    const exUser = schema.users.findBy({ id: userId });

    if (!exUser) return handleErrors(null, "No such user exists.");

    const now = dayjs().format();
    const diary = exUser.createDiary({
      title,
      type,
      createdAt: now,
      updatedAt: now,
    });

    return {
      user: {
        ...exUser.attrs,
      },
      diary: diary.attrs,
    };
  } catch (error) {
    return handleErrors(error, "Failed to create Diary.");
  }
};

export const updateDiary = (schema: any, req: Request): Diary | Response => {
  try {
    const diary = schema.diaries.find(req.params.id);
    const data = JSON.parse(req.requestBody) as Partial<Diary>;
    const now = dayjs().format();
    diary.update({
      ...data,
      updatedAt: now,
    });
    return diary.attrs as Diary;
  } catch (error) {
    return handleErrors(error, "Failed to update Diary.");
  }
};

export const getDiaries = (schema: any, req: Request): Diary[] | Response => {
  try {
    const user = schema.users.find(req.params.id);
    return user.diary as Diary[];
  } catch (error) {
    return handleErrors(error, "Could not get user diaries.");
  }
};
