import { ValueObject } from "../../../core/domain/ValueObject";
import { Result } from "../../../core/logic/Result";
import { getRandomInt } from "../../../utils/getRandomInt";

export enum Suppliers {
  Apple = "apple",
  Sprint = "sprint",
  TMobile = "t-mobile",
}

interface SupplierProps {
  value: Suppliers;
}

export class Supplier extends ValueObject<SupplierProps> {
  get value (): Suppliers {
    return this.props.value;
  }
  
  private constructor (props: SupplierProps) {
    super(props);
  }

  public static generate (): Supplier {
    const supplierslist = [Suppliers.Apple, Suppliers.Sprint, Suppliers.TMobile];
    const randomValue = supplierslist[getRandomInt(0,2)];
    return new Supplier({ value: randomValue, });
  }

  public static create (value: Suppliers): Result<Supplier> {
    return Result.ok<Supplier>(new Supplier({ value, }));
  }
}