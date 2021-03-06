this.suite_html2json = {
  'test of test': function(test) {
    test.strictEqual(typeof html2json, 'function');
    test.done();
  },
  'should parse div': function(test) {
    var json = { 'tag' : 'div' };
    var html = '<div></div>';

    var parsedHtml = parseHtml(html);
    test.strictEqual(parsedHtml, html);
    var actual = html2json(html);
    var expected = json;
    test.deepEqual(actual, expected);
    test.done();
  },
  'should parse div with text': function(test) {
    var json = {
      tag: 'div',
      text: 'this is div'
    };
    var html = '<div>this is div</div>';

    var parsedHtml = parseHtml(html);
    test.strictEqual(parsedHtml, html);
    var actual = html2json(html);
    var expected = json;
    test.deepEqual(actual, expected);
    test.done();
  },
  'should parse div with id': function(test) {
    var json = { tag: 'div', attr: { id: 'foo'} };
    var html = '<div id="foo"></div>';

    var parsedHtml = parseHtml(html);
    test.strictEqual(parsedHtml, html);
    var actual = html2json(html);
    var expected = json;
    test.deepEqual(actual, expected);
    test.done();
  },
  'should parse div with id and class': function(test) {
    var json = {
      tag: 'div',
      attr: { id: 'foo', class: ['bar', 'goo'] },
      text: 'this is div'
    };
    var html = '<div id="foo" class="bar goo">this is div</div>';

    var parsedHtml = parseHtml(html);
    test.strictEqual(parsedHtml, html);
    var actual = html2json(html);
    var expected = json;
    test.deepEqual(actual, expected);
    test.done();
  },
  'should parse div with child': function(test) {
    var json = {
      tag: 'div',
      child: [{
        tag: 'p'
      }]
    };
    var html = '<div><p></p></div>';

    var parsedHtml = parseHtml(html);
    test.strictEqual(parsedHtml, html);
    var actual = html2json(html);
    var expected = json;
    test.deepEqual(actual, expected);
    test.done();
  },
  'should parse div with 2 child': function(test) {
    var json = {
      tag: 'div',
      child: [{
        tag: 'p'
      },{
        tag: 'p'
      }]
    };
    var html = '<div><p></p><p></p></div>';

    var parsedHtml = parseHtml(html);
    test.strictEqual(parsedHtml, html);
    var actual = html2json(html);
    var expected = json;
    test.deepEqual(actual, expected);
    test.done();
  },
  'should parse div with nested child': function(test) {
    var json = {
      tag: 'div',
      child: [{
        tag: 'p',
        child: [{
          tag: 'textarea'
        }]
      }]
    };
    var html = '<div><p><textarea></textarea></p></div>';

    var parsedHtml = parseHtml(html);
    test.strictEqual(parsedHtml, html);
    var actual = html2json(html);
    var expected = json;
    test.deepEqual(actual, expected);
    test.done();
  },
  'should parse div with 2 nested child': function(test) {
    var json = {
      tag: 'div',
      child: [{
        tag: 'p',
        child: [{
          tag: 'textarea'
        }]
      },{
        tag: 'p'
      }]
    };
    var html = '<div><p><textarea></textarea></p><p></p></div>';

    var parsedHtml = parseHtml(html);
    test.strictEqual(parsedHtml, html);
    var actual = html2json(html);
    var expected = json;
    test.deepEqual(actual, expected);
    test.done();
  },
  'should parse div with unary & ingored inline tag': function(test) {
    var json = {
      tag: 'div',
      attr: {
        id: '1',
        class: ['foo', 'bar']
      },
      child: [{
        tag: 'h2',
        text: 'sample text'
      },{
        tag: 'input',
        attr: {
          id: 'execute',
          type: 'button',
          value: 'execute'
        }
      },{
        tag: 'img',
        attr: {
          src: 'photo.jpg',
          alt: 'photo'
        }
      }]
    };

    var html = ''
      + '<div id="1" class="foo bar">'
      + '<h2>sample text</h2>'
      + '<input id="execute" type="button" value="execute"/>'
      + '<img src="photo.jpg" alt="photo"/>'
      + '</div>';

    var parsedHtml = parseHtml(html);
    test.strictEqual(parsedHtml, html);
    var actual = html2json(html);
    var expected = json;
    test.deepEqual(actual, expected);
    test.done();
  },
  'should parse div with inline tag': function(test) {
    var json = {
      tag: 'div',
      attr: {
        id: '1',
        class: ['foo', 'bar']
      },
      child: [{
        tag: 'p',
        text: 'sample text with tag <strong>like</strong> this'
      },{
        tag: 'p',
        text: '<strong>start</strong> with inline tag'
      }]
    };

    var html = ''
      + '<div id="1" class="foo bar">'
      + '<p>sample text with tag <strong>like</strong> this</p>'
      + '<p><strong>start</strong> with inline tag</p>'
      + '</div>';

    var parsedHtml = parseHtml(html);
    test.strictEqual(parsedHtml, html);
    var actual = html2json(html);
    var expected = json;
    test.deepEqual(actual, expected);
    test.done();
  },
  'should parse I want to :)': function(test) {
    var json = {
      tag: 'div',
      attr: {
        id: '1',
        class: ['foo']
      },
      child: [{
        tag: 'h2',
        text: 'sample text with <code>inline tag</code>'
      },{
        tag: 'pre',
        attr: {
          id: 'demo',
          class: ['foo', 'bar']
        }
      },{
        tag: 'pre',
        attr: {
          id: 'output',
          class: ['goo']
        }
      },{
        tag: 'input',
        attr: {
          id: 'execute',
          type: 'button',
          value: 'execute'
        }
      }]
    };
    var html = ''
      + '<div id="1" class="foo">'
      + '<h2>sample text with <code>inline tag</code></h2>'
      + '<pre id="demo" class="foo bar"></pre>'
      + '<pre id="output" class="goo"></pre>'
      + '<input id="execute" type="button" value="execute"/>'
      + '</div>';

    var parsedHtml = parseHtml(html);
    test.strictEqual(parsedHtml, html);
    var actual = html2json(html);
    var expected = json;
    test.deepEqual(actual, expected);
    test.done();
  }
};
