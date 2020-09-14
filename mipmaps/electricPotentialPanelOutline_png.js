/* eslint-disable */
import simLauncher from '../../joist/js/simLauncher.js';

const mipmaps = [
  {
    "width": 499,
    "height": 535,
    "url": "data:image/png;base64,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hRaQJEmFFpAkSYUWkCRJhRaQJEmFFpAkSYUWkCRJhRaQJEmFFpAkSYUWkCRJhRaQJEmFFpAkSYUWkCRJhRaQJEmFFpAkSYUWkCRJhRaQJEmFFpAkSYUWkCRJhRaQJEmFFpAkSYUWkCRJhRaQJEmFFpAkSYUWkCRJhRaQJEmFFpAkSYUWkCRJhRaQJEmFFpAkSYUWkCRJhRaQJEmFFpAkSYUWkCRJhRaQJEmFFpAkSYUWkCRJhRaQJEmFFpAkSYUWkCRJhRaQJEmFFpAkSYUWkCRJhRaQJEmFFpAkSYUWkCRJhRaQJEmFFpAkSYUWkCRJhRaQJEmFFpAkSYUWkCRJhRaQJEmFFpAkSYUWkCRJhRaQJEmFFpAkSYUWkCRJhRaQJEmFFpAkSYUWkCRJhRaQJEmFFpAkSYUWkCRJhRaQJEmFFpAkSYUWkCRJhRaQJEmFFpAkSYUWkCRJhRaQJEmFFpAkSYUWkCRJhRaQJEmFFpAkSYUWkCRJhRaQJEmFFpAkSYUWkCRJhRaQJEmFFpAkSYUWkCRJhRaQJEmFFpAkSYUWkCRJhRaQJEmFFpAkSYUWkCRJhRaQJEmFFpAkSYUWkCRJhRaQJEmFFpAkSYUWkCRJhRaQJEmFFpAkSYUWkCRJhRaQJEmFFpAkSYUWkCRJhRaQJEmFFpAkSYUWkCRJhRaQJEmFFpAkSYUWkCRJhRaQJEmFFpAkSYUWkCRJhRaQJEmFFpAkSYUWkCRJhRaQJEmFFpAkSYUWkCRJhRaQJEmFFpAkSYUWkCRJhRaQJEmFFpAkSYUWkCRJhRaQJEmFFpAkSYUWkCRJhRaQJEmFFpAkSYUWkCRJhRaQJEmFFpAkSYUWkCRJhRaQJEmFFpAkSYUWkCRJhRaQJEmFFpAkSYUWkCRJhRaQJEmFFpAkSYUWkCRJhRaQJEmFFpAkSYUWkCRJhRaQJEmFFpAkSYUWkCRJhRaQJEmFFpAkSYUWkCRJhRaQJEmFFpAkSYUWkCRJhRaQJEmFFpAkSYUWkCRJhRaQJEmFFpAkSYUWkCRJhRaQJEmFFpAkSYUWkCRJhRaQJEmFFpAkSYUWkCRJhRaQJEmFFpAkSYUWkCRJhRaQJEmFFpAkSYUWkCRJhRaQJEmFFpAkSYUWkCRJhRaQJEmFFpAkSYUWkCRJhRaQJEmFFpAkSYUWkCRJhRaQJEmFFpAkSYUWkCRJ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"
  },
  {
    "width": 250,
    "height": 268,
    "url": "data:image/png;base64,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"
  },
  {
    "width": 125,
    "height": 134,
    "url": "data:image/png;base64,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"
  },
  {
    "width": 63,
    "height": 67,
    "url": "data:image/png;base64,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"
  },
  {
    "width": 32,
    "height": 34,
    "url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAiCAYAAAA+stv/AAAAAklEQVR4AewaftIAAAK3SURBVMXBzWscdRjA8e/vmcm+pNNtu0Y2EZOUJNhuu7NZhYIgvkHx4KEp6h8gIlVzEJFSeih40Jt48BRFe7Igtd5E9NyKBpPqZCYQUCFpVpvQxZek2ZrZ3Zmnm1tZsW7A7nw+xgsW06heAI5blrWfeyRqRSiKEXMLZQ5jXq+4Jd9G9UKj0Xghm8myvr7F1laIKv+7WGMymT6GBp1+25YnVfU8cMwGjsex8OHHi8zO17nXJg6meOXUQ+QPZB/xFoITYozZf/nKdWbn6/TCLysNLn2+TJtgOCy0ef4GvfT9D3W2wxY7hLZmU+m1qKXsEBImJExImJAwIWFCwoSECQkTEiYkTEiYkDAhYULChIQJCRMSJoD22YZesyzDDkF140jRoZfKR7JkMnaMmiVR+O6Jxx9gIG/RC5bAyalhVHWpMln6wgZzOpdLj515s3joy69W+WZ2kyjiX/Vn4f680qnZhOs3DHdTKmZ4bmqEkeFcDXiLNkPbgh88qPAOhmONMBqp1W4511Zv4gcbzHt17rTPCSnc9xedmlEfy7/mudNQweaxRw8wMZ5jcGhP09mT+g1YNIZ3J133Mm2GDgvBoqOqLwFPAQ9vboajP3o18+mldVoRDA60GDu4TacwFK4G/ewoHc4wdWKY0ZHcTRHjo/otxlyslN2rdDD8B88PXgbeCILa0fdnrqEaodE2/2AEsbIcPZRh+tViI522PgPerpTdn7gLQxcW/GAojrny0fml8dXqn4yN/kGnMEzx88oA584W43w++16l7J6hCxZd+GBmZmt6epqJidwzyyt/y5yXprrmUF1zqK45VNcc0ul9vHZqnELB+bpSdl+kS4Zd8PzgojHm+Xq9adXrDaIoRkTIZm327k0pMGuMOTnplm7QJcMueX7wLPA0UDCQUjQCfgczVym7n7BLtwFoRvZWtezZkwAAAABJRU5ErkJggg=="
  }
];
mipmaps.forEach( mipmap => {
  mipmap.img = new Image();
  const unlock = simLauncher.createLock( mipmap.img );
  mipmap.img.onload = unlock;
  mipmap.img.src = mipmap.url; // trigger the loading of the image for its level
  mipmap.canvas = document.createElement( 'canvas' );
  mipmap.canvas.width = mipmap.width;
  mipmap.canvas.height = mipmap.height;
  const context = mipmap.canvas.getContext( '2d' );
  mipmap.updateCanvas = () => {
    if ( mipmap.img.complete && ( typeof mipmap.img.naturalWidth === 'undefined' || mipmap.img.naturalWidth > 0 ) ) {
      context.drawImage( mipmap.img, 0, 0 );
      delete mipmap.updateCanvas;
    }
  };
} );
export default mipmaps;