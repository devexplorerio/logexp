


export class Utils {

  static groupBy(arr: any[], inputKey: string): any[] {
    return arr.reduce((acc: any[], entry: any) => {
      const key = entry[inputKey];
      if (!acc[key]) acc[key] = [];
      acc[key].push(entry);
      return acc;
    }, {});
  };

};
