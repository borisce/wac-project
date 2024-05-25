import { newSpecPage } from '@stencil/core/testing';
import { BoceLogin } from '../boce-login';

describe('boce-login', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [BoceLogin],
      html: `<boce-login></boce-login>`,
    });
    expect(page.root).toEqualHtml(`
      <boce-login>
        <mock:shadow-root>
        <h1>
               Prihlásenie do systému
             </h1>
             <form action="#">
               <div class="form-flex">
                 <label htmlfor="email">
                   Email
                 </label>
                 <input id="email" placeholder="email" type="email">
                 <label htmlfor="password">
                   Heslo
                 </label>
                 <input id="password" placeholder="heslo" type="password">
                 <div class="button-flex">
                   <md-elevated-button>
                     Prihlásiť sa ako lekár
                   </md-elevated-button>
                   <md-elevated-button>
                     Prihlásiť sa ako pacient
                   </md-elevated-button>
                 </div>
               </div>
             </form>
        </mock:shadow-root>
      </boce-login>
    `);
  });
});
