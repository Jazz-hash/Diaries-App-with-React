import { Server, Response, Model, belongsTo, hasMany, Factory } from "miragejs";
import user from "./routes/user";
import * as diary from "./routes/diary";
import * as entry from "./routes/entry";

export const handleErrors = (
  error: any,
  message: string | "An error occured"
) => {
  return new Response(400, undefined, {
    data: {
      message,
      isError: true,
    },
  });
};


export const setupServer = (env?: string): Server => {
  return new Server({
    environment: env ?? "production",

    models: {
      entry: Model.extend({
        diary: belongsTo(),
      }),
      diary: Model.extend({
        entry: hasMany(),
        user: belongsTo(),
      }),
      user: Model.extend({
        diary: hasMany(),
      }),
    },

    factories: {
      user: Factory.extend({
        username: "test",
        password: "password",
        email: "test@email.com",
      }),
    },

    seeds: (server): any => {
      server.create("user");
    },

    routes(): void {
      this.urlPrefix = "https://diaries.app";

      this.get("/diaries/entries/:id", entry.getEntries);
      this.get("/diaries/:id", diary.getDiaries);

      this.post("/auth/login", user.login);
      this.post("/auth/signup", user.signup);

      this.post("/diaries/", diary.create);
      this.post("/diaries/entry/:id", entry.addEntry);

      this.put("/diaries/entry/:id", entry.updateEntry);
      this.put("/diaries/:id", diary.updateDiary);
    },
  });
};
