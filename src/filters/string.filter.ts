import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class StringFilter {
  @Field({ nullable: true })
  is?: string;

  @Field({ nullable: true })
  like?: string;

  @Field(/* istanbul ignore next */ () => [String], {
    nullable: 'itemsAndList',
  })
  in?: Array<string>;
}
