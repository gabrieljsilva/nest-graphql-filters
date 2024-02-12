# Nest Graphql Filters
Generate filters in a simple, automatic and standardized way in the @nestjs framework and @nestjs/graphql using decorators.

## Installation

```shell
npm install @gabrieljsilva/nest-graphql-filters
```
or
```shell
yarn add @gabrieljsilva/nest-graphql-filters
```

## Usage
First, it's necessary to register the module, where the registration method requires a mandatory 
param called `databaseProvider`. This information is crucial in the subsequent serialization process.
Ex:

```typescript
import { NestFilterModule } from '@gabrieljsilva/nest-graphql-filters';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'schema.gql')
    }),
    NestFilterModule.register('pg'),
    // rest of imports...
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}

```
After registering the module, the second step is to declare the entities using a class and applying the decorators: `FilterableEntity` and `FilterableField`.

- `FilterableEntity`: Marks a class as an entity.
- `FilterableField`: Marks a class property as a "filterable" field.

ex:
```ts
import { ID } from '@nestjs/graphql';
import { FilterableEntity, FilterableField } from '@gabrieljsilva/nest-graphql-filters';

@FilterableEntity()
export class User {
  @FilterableField(() => ID)
  id: string;
  
  @FilterableField()
  name: string;

  @FilterableField()
  email: string;
  
  password: string;
    
  @FilterableField()
  createdAt: Date;
  
  @FilterableField()
  deletedAt?: Date;
}
```

To apply this filter in a `Resolver`, use the `FilterArgs` decorator, passing the
target entity as an argument.
It's possible to infer type using "FilterOf" generic.
Ex:

````ts
import { Query, Resolver } from '@nestjs/graphql';
import { FilterArgs, FilterOf } from '@gabrieljsilva/nest-graphql-filters';

import { UserService } from './user.service';
import { User } from '../../models';

@Resolver(User)
export class UserResolver {
    constructor(private readonly userService: UserService) {}
    
    @Query(() => [User])
    async findUsers(@FilterArgs(User) userFilter: FilterOf<User>) {
        return this.userService.findUsers(userFilter);
    }
}
````

### Operations
Each primitive type has an associated filter with its own operators:

|          | Boolean | ID  | Int | Float | String | Date | Timestamp |
|----------|---------|-----|-----|-------|--------|------|-----------|
| **Is**   | ✓       | ✓   | ✓   | ✓     | ✓      | ✓    | ✓         |
| **Like** | ✕       | ✕   | ✕   | ✕     | ✓      | ✕    | ✕         |
| **In**   | ✕       | ✕   | ✓   | ✓     | ✓      | ✓    | ✓         |
| **Gt**   | ✕       | ✕   | ✓   | ✓     | ✕      | ✓    | ✓         |
| **Lt**   | ✕       | ✕   | ✓   | ✓     | ✕      | ✓    | ✓         |
| **Gte**  | ✕       | ✕   | ✓   | ✓     | ✕      | ✓    | ✓         |
| **Lte**  | ✕       | ✕   | ✓   | ✓     | ✕      | ✓    | ✓         |

Also, each entity is created with the following logical operators:

| Name     | Description                                        |
|----------|----------------------------------------------------|
| **_AND** | A list of entities that perform an "AND" operation |
| **_OR**  | A list of entities that perform an "OR" operation  |
| **_NOT** | A list of entities that perform an "NOT" operation |

### Querying
Through the previously defined `User` entity and the `findUsers` query, it is possible to construct the following GraphQL query:

`Example Query`
```graphql
query FindUsers($filter: UserFilter) {
    findUsers(filters: $filter){
        id
        name
        email
        createdAt
        deletedAt
    }
}
```

`Example Variables`
```json
{
  "filters": {
    "name": {
      "like": "John"
    },
    "createdAt": {
      "gte": "2024-01-01" 
    },
    "_NOT": [
      {
        "name": {
          "is": "John Doe"
        }
      }
    ]
  }  
}
```

### Relationships
In addition to filters based on primitive types, it is also possible to create relationships between entities.
Ex:

```ts
import { ID } from '@nestjs/graphql';
import { FilterableEntity, FilterableField } from '@gabrieljsilva/nest-graphql-filters';

@FilterableEntity()
export class Photo {
    @FilterableField(() => ID)
    id: string;

    @FilterableField()
    url: string;
    
    @FilterableField()
    category: string
}

@FilterableEntity()
export class User {
  @FilterableField(() => ID)
  id: string;
  
  @FilterableField()
  name: string;

  @FilterableField()
  photo: Photo
}
```

`Example Query`
```graphql
query FindUsers($filter: UserFilter) {
    findUsers(filters: $filter){
        id
        name
        photo {
            id
            url
            category
        }
    }
}
```

`Example Variables`
```json
{
  "filters": {
    "email": {
      "is": "john.doe@email.com"
    },
    "photo": {
      "category": {
        "is": "Nature"
      }  
    }
  }  
}
```

### Circular Dependency
Although not recommended, it is still possible to create circular types (types that depend on each other simultaneously).

```ts
import { ID } from '@nestjs/graphql';
import { FilterableEntity, FilterableField } from '@gabrieljsilva/nest-graphql-filters';

@FilterableEntity()
export class Credentials {
    @FilterableField(() => ID)
    id: string;

    @FilterableField()
    email: string;

    password: string;

    @FilterableField(() => User)
    user: User
}

@FilterableEntity()
export class User {
    @FilterableField(() => ID)
    id: string;

    @FilterableField()
    name: string;

    @FilterableField()
    Credentials: Credentials
}
```
PS: The SWC compiler does not correctly load circular dependencies.

## Serialization
It's possible to use pipes to serialize the data received in the request.
Ex:

```ts
import { FilterOptions } from '@gabrieljsilva/nest-graphql-filters';

export const ToPrismaQueryPipe = memoize<(type: Type) => PipeTransform>(
    createToPrismaQueryPipe,
);

function createToPrismaQueryPipe(type: Type): Type<PipeTransform> {
    class ToPrismaQueryPipe implements PipeTransform {
        constructor(@Inject(FilterOptions) filterOptions: FilterOptions) {}

        async transform<T = unknown>(value: FilterOf<T>) {
            if (!value) {
                return {};
            }
            const fieldMetadata = FilterTypeMetadataStorage.getIndexedFieldsByType(type);
            return this.getWhereInputQuery(value, fieldMetadata);
        }

        getWhereInputQuery(
            filter: FilterOf<unknown>,
            metadata: Map<string, FieldMetadata>,
            query = {},
        ) {
            // Implements your query here
        }
    }

    return ToPrismaQueryPipe;
}
```

The property filterOptions contains the property named provider, which is the name of the database provider. 
Since even among relational databases that use SQL, there are some differences in query construction, this information
can assist in writing more generic pipes and facilitate the database switch at some point.

To use pipes with parameters, it's necessary to create a function that returns the pipe class, or it's instance.
By using this method, a new pipe is created for each implementation of the filter.
To prevent redundancy in pipe creation, the memoization technique can be applied, ensuring the use of the same pipe even when implemented in multiple different queries.

It's possible to create more complex pipes by utilizing metadata extracted from the following functions:

| Name               | Return Type                | description                                                |
|--------------------|----------------------------|------------------------------------------------------------|
| getFieldMetadata   | Set<FieldMetadata>         | Returns a set of FieldMetadata.                            |
| getIndexedFields   | Map<string, FieldMetadata> | Returns a Map where the keys are the names of the Schemas. |

Both functions have different goals. The `getFieldMetadata` function aims to be iterable and presents
a complexity of O(N), while the `getIndexedFields` function aims to be indexed by name to avoid iterations and optimize performance
in runtime with a complexity of O(1).

`FieldMetadata`

| Property          | Type      | Description                        |
|-------------------|-----------|------------------------------------|
| name              | string    | Name of the property (public)      |
| originalName      | string    | Original name of the property      |
| type              | Type      | Property original type             |
| isPrimitiveType   | boolean   | Whether type is a primitive        |
| nullable          | boolean   | Whether the field is nullable      |
| isArray           | boolean   | Whether the property is an array   |
| description       | string?   | Custom description of the property |

PS: Marking a property as "array" or "nullable" does not imply that the generated filter property
by the library is an "array" or "null", refers only to the original entity property. Marking a field
as "nullable" or "array" serves to guide pipes to the exact structure of the original entity.

### Applying pipes

```ts
import { ToPrismaQueryPipe } from '../../pipes';

@Resolver(User)
export class UserResolver {
    constructor(private readonly userService: UserService) {}

    @Query(() => [User])
    async findUsers(@FilterArgs(User, ToPrismaQueryPipe(User)) userFilter: FilterOf<User>) {
        return this.userService.findUsers(userFilter);
    }
}
```

## Customization
It's possible to make some customizations to the generated types or metadata through decorators:

```ts
// Defines a custom name for the type that will be exposed by the API
@FilterableEntity('CustomUserFilterName')
export class User {
    @FilterableField(() => ID)
    id: string;

    // Defines a custom name and description for the property that will be exposed by the API 
    // and defines in the metadata that this property is not nullabe
    @FilterableField({ name: 'customUserName', description: 'My Awesome Name', nullable: false })
    name: string;

    // Defines in the metadata that this field is an array of a specific type
    @FilterableField(() => [Photo])
    photo: Photo[]

    // Explicitly defines type and options
    @FilterableField(() => Address, { name: 'myAddress', nullable: true })
    address?: Address
}
```
