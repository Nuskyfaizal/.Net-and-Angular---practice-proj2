// import { Injectable } from '@angular/core';
// import { build$ } from 'protractor/built/element';
// import { Subject } from 'rxjs';
// import { BrowserXhr } from "@angular/common/http";

// @Injectable()
// export class ProgressService {
//   uploadProgress: Subject<any> = new Subject();
//   downloadProgress: Subject<any> = new Subject();
// }

// @Injectable()
// export class BrowserXhrWithProgress extends BrowserXhr {

//   constructor(private service: ProgressService){
//     super();

//     build$():XMLHttpRequest {
//       var xhr: XMLHttpRequest = super.build();

//       xhr.onprogress = (event) => {
//         this.service.downloadProgress.next({
//           total: event.total,
//           percentage: Math.round(event.loaded / event.total * 100)
//         });
//       };
//       return xhr;
//     }
//   }
// }
