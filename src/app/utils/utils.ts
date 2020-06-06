import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class Utils {

    static findValueInCollection(collection: any[], searchValue: any) {

        searchValue = searchValue?.toLowerCase();

        return collection.filter(value => {
            let flag: boolean = true
            for (const key in value) {
                if(!value[key]) value[key] = '';
                value[key] = value[key].toString();

                flag = value[key]?.toLowerCase().indexOf(searchValue) > -1 ? true : false;
                if (flag) {
                    return value;
                }
            }
        });
    }

    static copyDeeperObject(object: any){
        return JSON.parse(JSON.stringify(object));
    }


    //   static searchInCollection(collection: any[], arg: object | null) {

    //     function callback(currentValue) {
    //       let flag: boolean = true

    //       for (const key in arg) {
    //         if (flag) {
    //           if (currentValue.hasOwnProperty(key)) {
    //             if (currentValue[key] === null) {
    //               currentValue[key] = '';
    //             }

    //             if (Number(currentValue[key])) {
    //               currentValue[key] = currentValue[key].toString();
    //             }
    //             if (Number(arg[key])) {
    //               arg[key] = arg[key].toString();
    //             }
    //             flag = (currentValue[key].toLowerCase().indexOf(arg[key].toLowerCase()) > -1) ? true : false;

    //           }
    //         }
    //       }

    //       if (flag) {
    //         return currentValue
    //       }
    //     }
    //     return collection.filter(callback, arg)
    //   }
}