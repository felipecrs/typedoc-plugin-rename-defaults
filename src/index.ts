import { Application, Context, Converter, Reflection } from "typedoc";

export function load(app: Readonly<Application>) {
  app.converter.on(
    Converter.EVENT_CREATE_DECLARATION,
    (_context: Context, reflection: Reflection, _node?: any) => {
      if (
        !reflection.parent ||
        !reflection.parent.name ||
        (reflection.name !== "default" && reflection.name !== "export=")
      )
        return;

      // Removes the folder name
      const name = reflection.parent.name.split("/").pop();
      if (name) {
        if (name.includes(".")) {
          reflection.name = name.split(".")[0];
        } else {
          reflection.name = name;
        }
      }
    }
  );
}
