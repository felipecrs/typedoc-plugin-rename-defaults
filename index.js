import { Converter } from "typedoc";
import camelCase from "camelcase";

/**
 * @param {Readonly<import('typedoc').Application>} app
 */
export function load(app) {
  /**
   * @param {import('typedoc').Context} context
   * @param {import('typedoc').DeclarationReflection} reflection
   */
  function handleCreateDeclaration(context, reflection) {
    if (reflection.name !== "default" && reflection.name !== "export=") {
      return;
    }

    // reflection.escapedName is the cheapest option
    if (
      reflection.escapedName &&
      reflection.escapedName !== "default" &&
      reflection.name !== "export="
    ) {
      reflection.name = reflection.escapedName;
      return;
    }

    // if that does not work, try harder
    const symbol = context.project.getSymbolFromReflection(reflection);
    if (symbol && symbol.declarations && symbol.declarations[0]) {
      /** @type {any} */
      const node = symbol.declarations[0];
      if (node && node.name) {
        reflection.name = node.name.getText();
        return;
      }
    }

    // Finally, fallback to the camel cased module (file) name
    if (reflection.parent && reflection.parent.name) {
      let name = reflection.parent.getFriendlyFullName();
      if (name) {
        // Remove the folder name if there is any
        name = name.split("/").pop();

        name = camelCase(name, { preserveConsecutiveUppercase: true });

        reflection.name = name;
      }
    }
  }

  app.converter.on(Converter.EVENT_CREATE_DECLARATION, handleCreateDeclaration);
}
