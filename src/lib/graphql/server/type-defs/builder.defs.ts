import { DocumentNode } from "graphql";
import { TypeSource } from "@graphql-tools/utils";

class TypeDefsBuilder {
   private _rootNode?: DocumentNode;
   private _dataNode?: DocumentNode;
   private _inputNode?: DocumentNode;
   private _extensionNodes: DocumentNode[] = [];

   constructor() {}

   addRootNode(node: DocumentNode) {
      this._rootNode = node;
      return this;
   }

   addDataNode(node: DocumentNode) {
      this._dataNode = node;
      return this;
   }

   addInputNode(node: DocumentNode) {
      this._inputNode = node;
      return this;
   }

   addExtensionNode(node: DocumentNode) {
      this._extensionNodes.push(node);
      return this;
   }

   get defs(): TypeSource[] {
      let defs: TypeSource[] = [];

      if (this._rootNode) defs.push(this._rootNode);
      if (this._dataNode) defs.push(this._dataNode);
      if (this._inputNode) defs.push(this._inputNode);
      if (this._extensionNodes.length)
         defs = [...defs, ...this._extensionNodes];

      return defs;
   }
}

export default TypeDefsBuilder;
