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
      <div>
        <h1>Portál pre evidenciu chorôb a vyšetrení</h1>
        <form action="#">
          <div class="form-flex">
            <h2>Prihlásenie</h2>
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
      </div>
    </mock:shadow-root>
  </boce-login>
`);

  });
});
