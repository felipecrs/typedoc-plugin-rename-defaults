import { Converter } from "typedoc";

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

    const symbol = context.project.getSymbolFromReflection(reflection);
    
    // First thing: if there's a JSDoc /** @name myVarName */ tag, use the first one.
    // console.debug(symbol.getJsDocTags())
    const nameTag = symbol.getJsDocTags().find(x => x.name === "name")
    if (nameTag?.text) {
      // console.debug(nameTag)
      // Use the first value. No idea what the rest are.
      reflection.name = nameTag.text[0].text
      return
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
    if (symbol && symbol.declarations && symbol.declarations[0]) {
      /** @type {any} */
      const node = symbol.declarations[0];
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

  app.converter.on(Converter.EVENT_CREATE_DECLARATION, handleCreateDeclaration);
}
