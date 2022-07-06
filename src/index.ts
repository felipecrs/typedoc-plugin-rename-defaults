import {
  Application,
  Context,
  Converter,
  DeclarationReflection,
  Reflection,
} from "typedoc";

export function load(app: Readonly<Application>) {
  app.converter.on(
    Converter.EVENT_CREATE_DECLARATION,
    (context: Context, reflection: DeclarationReflection) => {
      if (reflection.name !== "default" && reflection.name !== "export=") {
        return;
      }

      // reflection.escapedName is the cheapest option
      if (reflection.escapedName && reflection.escapedName !== "default") {
        reflection.name = reflection.escapedName;
        return;
      }

      // if that does not work, try harder
      const symbol = context.project.getSymbolFromReflection(reflection);
      if (symbol) {
        const node: any = symbol.valueDeclaration;
        if (node && node.name) {
          reflection.name = node.name.getText();
          return;
        }
      }

      // Finally, fallback to the file name
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
