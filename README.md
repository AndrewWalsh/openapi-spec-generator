<a name="readme-top"></a>

[![MIT License][license-shield]][license-url]
<a href="https://www.npmjs.com/package/@andrew_walsh/openapi-spec-generator"><img alt="npm" src="https://img.shields.io/npm/v/@andrew_walsh/openapi-spec-generator?style=for-the-badge"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <h1 align="center" style="max-width: 600px;">
    @andrew_walsh/openapi-spec-generator
  </h1>
  <p align="center" style="max-width: 600px;">
    An opinionated and performant OpenAPI specification generator that can run in the browser.
  </p>
</div>

## About

```
npm i @andrew_walsh/openapi-spec-generator -S
```

[The algorithm that powers OpenAPI DevTools](https://github.com/AndrewWalsh/openapi-devtools).

This library exports a class `RequestStore` with public methods that can be used to construct OpenAPI specifications in real time from [HAR requests](https://www.npmjs.com/package/@types/har-format). This class has a simple interface, so please view it to see capabilities.

A design feature of this library is that it is opinionated. There is limited customisability. The goal is to produce a specification that works for most people. If you are looking for more customisation, check out [HAR to OpenAPI](https://github.com/jonluca/har-to-openapi).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

[license-url]: https://github.com/AndrewWalsh/openapi-devtools/blob/main/LICENSE.txt
[license-shield]: https://img.shields.io/github/license/AndrewWalsh/openapi-devtools.svg?style=for-the-badge
