const InputJson = {
    "sections": [
      {
        "submitButtonLabel": "submit",
        "fields": [
        {
            "name": "firstName",
            "label": "First Name",
            "component": "TextInput",
            "type": "text"
        }, {
            "name": "lastName",
            "label": "Last Name",
            "component": "TextInput",
            "type": "text"
        }, {
            "name": "email",
            "label": "Email",
            "component": "TextInput",
            "type": "email"
        },{
          "name": "email1",
          "label": "Email1",
          "component": "TextInput",
          "type": "email"
      }, {
            "name": "password",
            "label": "Password",
            "component": "PasswordInput"
        },
        {
          "name": "pass",
          "label": "Password pass",
          "component": "PasswordInput"
      }, {
            "name": "termsAndCondition",
            "component": {
              "name": "CheckboxBase",
              "props": {
                "label": "Terms and Conditions and Privacy Policy",
            }
        } 
        }] 
    }],
    "validation": {
      "schema": {
        "title": "SignupForm",
        "type": "object",
        "properties": {
          "firstName": {
            "type": "string",
            "required": true
          },
          "lastName": {
            "type": "string",
            "required": true
          },
          "email": {
            "type": "string",
            "format": "email",
            "required": true
          },
          "email1": {
            "type": "string",
            "format": "email",
            "required": true
          },
          "password": {
            "type": "string",
            "required": true
          },
          "pass": {
            "type": "string",
            "required": true
          },
          "termsAndCondition": {
            "type": "boolean",
            "required": true,
            "oneOf": [
                    true
            ] }
   } },
      "config": {
        "errMessages": {
          "firstName": {
            "required": "First Name is Required"
          },
          "lastName": {
            "required": "Last Name is Required"
          },
          "email": {
            "required": "Email is Required",
            "format": "Email should be correct format which is abc@example.com"
          },
          "email1": {
            "required": "Email1 is Required",
            "format": "Email should be correct format which is abc@example.com"
          },
          "password": {
            "required": "Password is required"
          },
          "pass": {
            "required": "Password pass is required"
          },
          "termsAndCondition": {
            "required": "Required",
            "oneOf": "Sample error message"
        }}
   }}
}

export default InputJson;
