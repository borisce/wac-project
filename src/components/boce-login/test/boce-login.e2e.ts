import { newE2EPage } from '@stencil/core/testing';

describe('boce-login', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<boce-login></boce-login>');

    const element = await page.find('boce-login');
    expect(element).toHaveClass('hydrated');
  });
});
