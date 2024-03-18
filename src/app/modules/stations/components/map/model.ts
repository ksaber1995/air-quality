import { OwlOptions } from "ngx-owl-carousel-o";

export const carouselOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    autoplay: false,
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
        items: 3
      },
      940: {
        items: 4
      }
    },
  }