const loginHtmlText = (appName: string = "Sulife Demo", name: string, callbackLink: string): string => {
  return `<table style="width: 100% !important;" cellpadding="0" cellspacing="0" border="0" width="100%">
  <tbody>
    <tr>
      <td align="center">
        <table cellpadding="40" cellspacing="0" border="0" width="600" style="border: 1px solid #eaeaea; border-radius: 5px; margin: 40px 0;">
          <tbody>
            <tr>
              <td align="center">
                <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI',
                      'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans',
                      'Droid Sans', 'Helvetica Neue', sans-serif;
                    text-align: left;
                    width: 465px;">
                  <table style="width: 100% !important;" cellpadding="0" cellspacing="0" border="0" width="100%">
                    <tbody>
                      <tr>
                        <td align="center">
                          <div>
                            <img alt="${appName}" width="50" src="https://imagedelivery.net/HYEXXB4RdymQS9JWZncLfw/7a129f31-d88b-44df-5dc6-360a39c77400/avatar">
                          </div>
                          <h1 style="color: #000;
                              font-family: -apple-system, BlinkMacSystemFont,
                                'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu',
                                'Cantarell', 'Fira Sans', 'Droid Sans',
                                'Helvetica Neue', sans-serif;
                              font-size: 24px;
                              font-weight: normal;
                              margin: 30px 0;
                              margin-top: 15px;
                              padding: 0;">
                            Log in to
                            <b><span>${appName}</span></b>
                          </h1>
                        </td>
                      </tr>
                    </tbody>
                  </table>
  
                  <p style="color: #000;
                      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI',
                        'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans',
                        'Droid Sans', 'Helvetica Neue', sans-serif;
                      font-size: 14px;
                      line-height: 24px;">
                    Hi! <b>${name}</b>.
                  </p>
  
                  <p style="color: #000;
                      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI',
                        'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans',
                        'Droid Sans', 'Helvetica Neue', sans-serif;
                      font-size: 14px;
                      line-height: 24px;">
                    Congratuation and Thank you for joining us.
                  </p>
                  <br>
  
                  <table style="width: 100% !important;" cellpadding="0" cellspacing="0" border="0" width="100%">
                    <tbody>
                      <tr>
                        <td align="center">
                          <div>
                            <a style="background-color: #1c64f2;
                                border-radius: 5px;
                                color: #fff;
                                display: inline-block;
                                font-family: -apple-system, BlinkMacSystemFont,
                                  'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu',
                                  'Cantarell', 'Fira Sans', 'Droid Sans',
                                  'Helvetica Neue', sans-serif;
                                font-size: 12px;
                                font-weight: 500;
                                line-height: 50px;
                                text-align: center;
                                text-decoration: none;
                                width: 200px;
                                     min-height:50px;" rel="noopener noreferrer" href="${callbackLink}">Login →</a>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
  
                  <br>
                  <p style="color: #000;
                      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI',
                        'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans',
                        'Droid Sans', 'Helvetica Neue', sans-serif;
                      font-size: 14px;
                      line-height: 24px;">
                    If the Login button doesn't work, please copy url below and paste it on your internet browser.
                  </p>
                  <p style="color: #000;
                      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI',
                        'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans',
                        'Droid Sans', 'Helvetica Neue', sans-serif;
                      font-size: 14px;
                      line-height: 24px;">
                    <a style="color: #067df7; text-decoration: none;" rel="noopener noreferrer" href="${callbackLink}">
                      ${callbackLink}
                    </a>
                  </p>
                  <br>
                  <hr style="border: none;
                      border-top: 1px solid #eaeaea;
                      margin: 26px 0;
                      width: 100%;">
                  <p style="color: #666666;
                      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI',
                        'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans',
                        'Droid Sans', 'Helvetica Neue', sans-serif;
                      font-size: 12px;
                      line-height: 24px;">
                    Thanks for being here!
                  </p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
  </table>`
}

export default loginHtmlText