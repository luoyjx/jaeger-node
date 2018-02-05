'use strict'

const Instrument = require('shimo-opentracing-auto')
const jaeger = require('shimo-jaeger-client')
const UDPSender = require('shimo-jaeger-client/dist/src/reporters/udp_sender').default

/**
* @class Tracer
*/
class Tracer {
  constructor ({
    serviceName,
    sampler = new jaeger.RateLimitingSampler(1),
    reporter = new jaeger.RemoteReporter(new UDPSender()),
    options = {}
  }) {
    if (!serviceName) {
      throw new Error('serviceName is required')
    }

    this._tracer = new jaeger.Tracer(serviceName, reporter, sampler, options)
    this.instrument = new Instrument({
      tracers: [this._tracer]
    })
  }
}

module.exports = Tracer
