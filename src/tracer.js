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
    sampler,
    reporter,
    options = {}
  }) {
    if (!serviceName) {
      throw new Error('serviceName is required')
    }

    sampler = sampler || new jaeger.RateLimitingSampler(1)
    reporter = reporter || new jaeger.RemoteReporter(new UDPSender(Object.assign({}, options.sender)))

    this._tracer = new jaeger.Tracer(serviceName, reporter, sampler, options)
    this.instrument = new Instrument({
      tracers: [this._tracer],
      enables: options.enables
    })
  }
}

module.exports = Tracer
