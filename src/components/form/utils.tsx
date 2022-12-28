import { DemoForm } from "./types";

export function formToSection(formData: any): DemoForm {
  let result: any = {};
  for (const [key, value] of formData) {
    result[key] = value;
  }
  return result as DemoForm;
}

export function propertyToJson(props: any, propertyName: string, target: any) {
    let result = JSON.parse(JSON.stringify(target))
    for(let prop in props){
      result.propertyList.residential[0][propertyName][prop]["_text"] = props[prop]
    }
    return result
}
