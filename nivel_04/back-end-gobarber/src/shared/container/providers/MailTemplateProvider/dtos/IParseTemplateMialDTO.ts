interface ITemplateVariables {
  [key: string]: string | number;
}

export default interface IParseTemplateMialDTO {

  template: string;
  variables: ITemplateVariables;

}
