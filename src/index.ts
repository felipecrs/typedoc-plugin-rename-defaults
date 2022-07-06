import { Application, Context, Converter, DeclarationReflection, Reflection } from "typedoc";

export function load(app: Readonly<Application>) {
  app.converter.on(
    Converter.EVENT_CREATE_DECLARATION,
    (context: Context, reflection: DeclarationReflection) => {
      if (reflection.name !== "default" && reflection.name !== "export=") {
        return;
      }

      if (reflection.escapedName && reflection.escapedName !== "default") {
        reflection.name = reflection.escapedName
        return;
      }

      // If a name for the reflection cannot be found, fallback to the file name
      if (reflection.parent && reflection.parent.name) {
        // Removes the folder name
        const name = reflection.parent.name.split("/").pop();
        if (name) {
          // Example: User.entity becomes just User
          reflection.name = name.split(".")[0];
        }
      }
    }
  );
}
