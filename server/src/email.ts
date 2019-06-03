interface IFormattingOptions {
  body: {
    style: string
  }
  title: string
  description: {
    text: string
    style: string
  }
  logo: {
    width: number
    src: string
    alt: string
  }
  button: {
    text: string
    href: string
    style: string
  }
}

export function formatEmail (opts: IFormattingOptions): string {
  const template = `
  <html>
    <head><title>${opts.title}</title></head>
    <body style="${opts.body.style}">
      <table align="center" width="100%" cellpadding="0" cellspacing="0">
        <tr height="150">
          <td align="center">
            <img
              style="width:${opts.logo.width}px"
              src="${opts.logo.src}"
              alt="${opts.logo.alt}"
            />
          </td>
        </tr>
        <tr>
          <td align="center">
            <p style="${opts.description.style}">
              ${opts.description.text}
            </p>
            <a href="${opts.button.href}">
              <button style="${opts.button.style}">
                ${opts.button.text}
              </button>
            </a>
          </td>
        </tr>
        <tr height="100"><td align="center"><a href="#"><!-- empty --></a></td></tr>
      </table>
    </body>
  </html>
`
  return template
}
