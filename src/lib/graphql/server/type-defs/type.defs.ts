import TypeDefsBuilder from "./builder.defs";
import dataTypeDefs from "./data.defs";
import inputTypeDefs from "./input.defs";
import rootTypeDefs from "./root.defs";

const builder = new TypeDefsBuilder();

builder
   .addRootNode(rootTypeDefs)
   .addInputNode(inputTypeDefs)
   .addDataNode(dataTypeDefs);

export default builder.defs;
