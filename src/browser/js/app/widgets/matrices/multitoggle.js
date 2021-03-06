var Matrix = require('./matrix'),
    parser = require('../../parser')

module.exports = class Multitoggle extends Matrix {

    static defaults() {

        return {
            type:'multitoggle',
            id:'auto',

            _geometry:'geometry',

            left:'auto',
            top:'auto',
            width:'auto',
            height:'auto',

            _style:'style',

            label:'auto',
            color:'auto',
            css:'',

            _matrix: 'Matrix',

            matrix: [2,2],
            start:0,
            spacing:0,
            traversing:true,
            led: false,
            on:1,
            off:0,

            _value: 'value',
            default: '',
            value: '',

            _osc: 'osc',

            precision:2,
            address:'auto',
            preArgs:[],
            split:false,
            target:[],
            bypass:false
        }

    }

    constructor(options) {

        super(options)

        this.widget.style.setProperty('--columns', this.getProp('matrix')[0])
        this.widget.style.setProperty('--rows', this.getProp('matrix')[1])
        this.widget.style.setProperty('--spacing', this.getProp('spacing') + 'rem')

        var strData = JSON.stringify(options.props)

        for (var i = this.start; i < this.getProp('matrix')[0] * this.getProp('matrix')[1] + this.start; i++) {

            var data = JSON.parse(strData)

            data.top = data.left = data.height = data.width = 'auto'
            data.type = 'toggle'
            data.id = this.getProp('id') + '/' + i
            data.label = i
            data.address = this.getProp('split') ? '@{parent.address}/' + i : '@{parent.address}'
            data.preArgs = this.getProp('split') ? '@{parent.preArgs}' : '#{concat(@{parent.preArgs},[' + i + '])}'
            data.css = ''

            var toggle = parser.parse([data], this.widget, this)
            toggle.container.classList.add('not-editable')

            this.value[i-this.start] = this.getProp('off')

        }

    }

}
