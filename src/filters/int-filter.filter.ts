import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class IntFilter {
  @Field(/* istanbul ignore next */ () => Int, { nullable: true })
  is?: number;

  @Field(/* istanbul ignore next */ () => [Int], { nullable: 'itemsAndList' })
  in?: Array<number>;

  @Field(/* istanbul ignore next */ () => Int, { nullable: true })
  gt?: number;

  @Field(/* istanbul ignore next */ () => Int, { nullable: true })
  lt?: number;

  @Field(/* istanbul ignore next */ () => Int, { nullable: true })
  gte?: number;

  @Field(/* istanbul ignore next */ () => Int, { nullable: true })
  lte?: number;
}
