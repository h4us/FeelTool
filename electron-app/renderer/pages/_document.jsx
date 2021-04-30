import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);

    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>

        {/* <script src="https://unpkg.com/@tensorflow/tfjs-core@2.7.0/dist/tf-core.js"></script> */}
        {/* <script src="https://unpkg.com/@tensorflow/tfjs-converter@2.7.0/dist/tf-converter.js"></script> */}

        {/* <script src="https://unpkg.com/@tensorflow/tfjs-backend-cpu@2.7.0/dist/tf-backend-cpu.js"></script> */}
        {/* <script src="https://unpkg.com/@tensorflow/tfjs-backend-wasm@2.7.0/dist/tf-backend-wasm.js"></script> */}
        {/* <script src="https://unpkg.com/@tensorflow/tfjs-backend-webgl@2.7.0/dist/tf-backend-webgl.js"></script> */}

        {/* <script src="https://cdn.jsdelivr.net/npm/@tensorflow-models/facemesh"></script> */}

        {/* <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r125/three.min.js"></script> */}

      </Html>
    );
  }
}

export default MyDocument;
