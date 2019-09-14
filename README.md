# joi-typescript-validator

Allows to create validation schemas by using typescript decorators using [joi](https://github.com/hapijs/joi) as a backend

Work is still in progress
<!-- markdown-toc start - Don't edit this section. Run M-x markdown-toc-refresh-toc -->
**Table of Contents**

- [joi-typescript-validator](#joi-typescript-validator)
    - [Installation](#installation)
    - [General Decorators](#general-decorators)
        - [Required Decorator](#required-decorator)
        - [Optional Decorator](#optional-decorator)
        - [Nullable Decorator](#nullable-decorator)
        - [ValidOptions Decorator](#validoptions-decorator)
    - [Number Decorators](#number-decorators)
        - [Max Decorator](#max-decorator)
        - [Min Decorator](#min-decorator)
        - [Positive Decorator](#positive-decorator)
        - [Negative Decorator](#negative-decorator)
    - [String Decorators](#string-decorators)
        - [MinLength Decorator](#minlength-decorator)
        - [MaxLength Decorator](#maxlength-decorator)
        - [NotEmpty Decorator](#notempty-decorator)
        - [Email Decorator](#email-decorator)
    - [Array Decorators](#array-decorators)
        - [ItemType Decorator](#itemtype-decorator)
        - [MinLength Decorator](#minlength-decorator-1)
        - [MaxLength Decorator](#maxlength-decorator-1)
        - [NotEmpty Decorator](#notempty-decorator-1)
    - [Nested Validations](#nested-validations)
    - [Usage](#usage-16)
    - [Inheritance](#inheritance)
    - [Getting the validation schema](#getting-the-validation-schema)
    - [Validating the object](#validating-the-object)
    - [Example](#example)

<!-- markdown-toc end -->

## Installation

```bash
    npm install --save joi-typescript-validator
```
## General Decorators

### Required Decorator

Invalidates the object if the field doesn't exist

#### Usage

```typescript
    class Example {
        @Required()
        public fields: string;
    }
    
    // Joi schema
    schema.required();
```



### Optional Decorator

Turns off the required flag for the field

#### Usage

```typescript
    class Example {
        @Optional()
        public fields: string;
    }

    // Joi schema
    schema.optional();
```

### Nullable Decorator 

Allows the field to have ***null*** as a value

#### Usage

```typescript
    class Example {
        @Nullable()
        public fields: string;
    }
    
    // Joi schema
    schema.allow(null)
```
or...

```typescript
    class Example {
        @Nullable()
        public fields: string;
    }

    class Derived extends Example {
        /**
         * Use it with a boolean value if you need to disable the value on 
         * a derived class
         * */
        @Nullable(false)
        public fields: string;
    }
```


### ValidOptions Decorator 

Allows only the values provided in the arguments

#### Usage

```typescript
    class Example {
        @ValidOptions('name', 'age')
        public fields: string;
    }

    // Joi schema
    schema.valid('name', 'age');
```

## Number Decorators

### Max Decorator

Specifies the max value for the field

#### Usage

```typescript
    class Example {
        @Max(42)
        public fields: number;
    }
    
    // Joi schema
    schema.max(42);
```
or...

```typescript
    class Example {
        /**
         * Excludes the value from being accepted 
         * */
        @Max({value: 42, exclude: true})
        public fields: number;
    }
    
    // Joi schema
    schema.max(42).invalid(42)
```

### Min Decorator

Specifies the min value for the field

#### Usage

```typescript
    class Example {
        @Min(42)
        public fields: number;
    }
    
    // Joi schema
    schema.min(42);
```
or...

```typescript
    class Example {
        /**
         * Excludes the value from being accepted 
         * */
        @Min({value: 42, exclude: true})
        public fields: number;
    }
    
    // Joi schema
    schema.min(42)
```

### Positive Decorator

Allows positive values only to the number field

#### Usage

```typescript
    class Example {
        @Positive()
        public fields: number;
    }

    // Joi schema
    schema.positive();

    class Derived extends Example {
        // Use the flags if you need to override it when you inherit
        @Positive(false)
        public fields: number;
    }
```

### Negative Decorator

Allows negative values only to the number field

#### Usage

```typescript
    class Example {
        @Negative()
        public fields: number;
    }

    // Joi schema
    schema.negative();

    class Derived extends Example {
        // Use the flags if you need to override it when you inherit
        @Negative(false)
        public fields: number;
    }
```

## String Decorators

### MinLength Decorator

Sets a lower limit to the string length

#### Usage

```typescript
    class Example {
        @MinLength(42)
        public fields: string;
    }
    
    // Joi schema
    schema.min(42);
```

### MaxLength Decorator

Sets an upper limit to the string length

#### Usage

```typescript
    class Example {
        @MaxLength(42)
        public fields: string;
    }
    
    // Joi schema
    schema.max(42);
```

### NotEmpty Decorator

Sets the string lower limit to 1 character

#### Usage

```typescript
    class Example {
        @NotEmpty()
        public fields: string;
    }
    
    // Joi schema
    schema.min(1);
    
    class Derived extends Example {
        // Use the flag if you want to disable the NotEmpty check on a derived class
        @NotEmpty(false)
        public fields: string;
    }
```

### Email Decorator

String field should be a valid email

#### Usage

```typescript
    class Example {
        @Email()
        public fields: string;
    }
    
    // Joi schema
    schema.email();
    
    class Derived extends Example {
        // Use the flag if you want to disable the Email check on a derived class
        @Email(false)
        public fields: string;
    }
```
## Array Decorators

### ItemType Decorator

Is required to specify the array item type if the array items should be validated

#### Usage

```typescript
    class Item {
        @Required()
        public id: number;
    }

    class Example {
        @ItemType(Item)
        public fields: Item[];
    }
    
    // Joi schema
    schema.array().items(Joi.object().keys({
        id: Joi.number().required()
    }));
```

### MinLength Decorator

Sets a lower limit to the array length

#### Usage

```typescript
    class Example {
        @MinLength(42)
        public fields: string[];
    }
    
    // Joi schema
    schema.array().min(42);
```

### MaxLength Decorator

Sets an upper limit to the array length

#### Usage

```typescript
    class Example {
        @MaxLength(42)
        public fields: string[];
    }
    
    // Joi schema
    schema.array().max(42);
```

### NotEmpty Decorator

Sets the array lower limit to 1 item

#### Usage

```typescript
    class Example {
        @NotEmpty()
        public fields: string[];
    }
    
    // Joi schema
    schema.array().min(1);
    
    class Derived extends Example {
        // Use the flag if you want to disable the NotEmpty check on a derived class
        @NotEmpty(false)
        public fields: string[];
    }
```
## Nested Validations

Validates the child fields if their type is another class

## Usage

```typescript
    class ChildObject {
        @Optional()
        id: number;
    }

    class Example {
        @Required()
        public child: ChildObject;
    }
    
    // Joi schema
    schema.object().keys({
        child: Joi.object().keys({
            id: Joi.number().optional()
        }).required()
    });
```
## Inheritance

Inherited classes inherit the validation metadata from the base class

### Usage

```typescript
    class BaseObject {
        @Optional()
        id: number;
    }

    class Inherited extends BaseObject {
        @Optional()
        name: string;
    }
    
    // Joi schema
    schema.object().keys({
        id: Joi.number().optional(),
        name: Join.string().optional()
    });
```
You can also override validation properties from the base class

```typescript
    class BaseObject {
        @Required()
        @Email()
        primary: string;
    }

    class Inherited extends BaseObject {
        @Optional()
        name: string;
        @Optional()
        primary: string;
    }
    
    // Joi schema
    // Base Class

    schema.object().keys({
        primary: Joi.string().email().required(),
    });

    // Derived Class 
    schema.object().keys({
        primary: Joi.string().email().optional(),
        name: Join.string().optional()
    });
```

## Getting the validation schema

```typescript

    import { getSchema } from 'joi-typescript-validator'

    class Example {
        @Required()
        @Email()
        email: string;
    }

    const schema: Joi.Schema = getSchema(Example);

```

## Validating the object

```typescript

    import { Validate } from 'joi-typescript-validator'

    class Example {
        @Required()
        @Email()
        public email: string;
    }

    const value : Example = new Example();
    value.email = "john@example.com"

    Validate(value).catch(error=>{console.log(error.message)});
```

## Example

```typescript
    import { Validate } from 'joi-typescript-validator'

    class UserData {

        @Optional()
        allowNotifications: boolean;

    }

    class Location {

        @Required()
        @NotEmpty()
        name: string;

        @Required()
        latitude: number;

        @Required()
        longitude: number;

    }

    class User {

        @Required()
        @Email()
        public email: string;

        @Required()
        @MaxLength(30)
        @MinLength(5)
        public username: string;

        @Required()
        @MaxLength(30)
        @MinLength(5)
        public password: string;

        @Optional()
        @Min({value: 18})
        @Max({value: 30, exclude: true})
        public age: number;

        @Required()
        public data: UserData;

        @Required()
        @ItemType(Location)
        @MaxLength(10)
        public locations: Location[];

    }

    async function fetchData(): Promise<User> {
        ...
    }

    fetchData().then((result: User)=>Validate(user));

```

