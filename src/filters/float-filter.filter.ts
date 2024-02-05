import { Field, Float, InputType } from '@nestjs/graphql';

@InputType()
export class FloatFilter {
  @Field(/* istanbul ignore next */ () => Float, { nullable: true })
  is?: number;

  @Field(/* istanbul ignore next */ () => [Float], { nullable: 'itemsAndList' })
  in?: Array<number>;

  @Field(/* istanbul ignore next */ () => Float, { nullable: true })
  gt?: number;

  @Field(/* istanbul ignore next */ () => Float, { nullable: true })
  lt?: number;

  @Field(/* istanbul ignore next */ () => Float, { nullable: true })
  gte?: number;

  @Field(/* istanbul ignore next */ () => Float, { nullable: true })
  lte?: number;
}
