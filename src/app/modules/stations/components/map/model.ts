import { OwlOptions } from "ngx-owl-carousel-o";

export const carouselOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    autoplay: true,
    autoWidth: true,
    // width
    // autoplaySpeed?: number | boolean;
    // autoplayHoverPause?: boolean;
    // autoplayTimeout?: number;

    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    nav: false,
    
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 4
      },
      940: {
        items: 4
      }
    },
  }