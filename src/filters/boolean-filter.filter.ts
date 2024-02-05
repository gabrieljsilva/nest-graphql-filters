import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class BooleanFilter {
  @Field(/* istanbul ignore next */ () => Boolean, { nullable: true })
  is?: boolean;
}
