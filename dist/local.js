'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _hoistNonReactStatics = require('hoist-non-react-statics');

var _hoistNonReactStatics2 = _interopRequireDefault(_hoistNonReactStatics);

var _reactRedux = require('react-redux');

var _actions = require('./actions.js');

var UIActions = _interopRequireWildcard(_actions);

var _localReducer = require('./localReducer.js');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (Config) {
  return function (Component) {
    var defaultMapStateToProps = function defaultMapStateToProps(state) {
      return state;
    };
    var ConnectComp = (0, _reactRedux.connect)(Config.mapStateToProps || defaultMapStateToProps, Config.mapDispatchToProps, Config.mergeProps)(function (props) {
      var newProps = (0, _assign2.default)({}, props);
      delete newProps.store;
      // eslint-disable-next-line
      return _react2.default.createElement(Component, newProps);
    });

    var UI = function (_React$Component) {
      (0, _inherits3.default)(UI, _React$Component);

      function UI(props, context) {
        (0, _classCallCheck3.default)(this, UI);

        var _this = (0, _possibleConstructorReturn3.default)(this, (UI.__proto__ || (0, _getPrototypeOf2.default)(UI)).call(this, props, context));

        var compKey = typeof Config.key === 'function' ? Config.key(props, context) : Config.key;
        _this.store = null;
        (0, _invariant2.default)(Config.key, '[redux-fractal] - You must supply a  key to the component either as a function or string');
        _this.compKey = compKey;
        _this.unsubscribe = null;
        return _this;
      }

      (0, _createClass3.default)(UI, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
          var existingState = this.context.store.getState().local[this.compKey];
          var storeResult = (0, _localReducer.createStore)(Config.createStore, this.props, this.compKey, existingState, this.context);
          this.store = storeResult.store;
          this.storeCleanup = storeResult.cleanup;
          this.context.store.dispatch({
            type: UIActions.CREATE_COMPONENT_STATE,
            payload: { config: Config, props: this.props, store: this.store, hasStore: !!Config.createStore },
            meta: { reduxFractalTriggerComponent: this.compKey }
          });
        }
      }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
          var _this2 = this;

          var persist = typeof Config.persist === 'function' ? Config.persist(this.props, this.context) : Config.persist;
          setTimeout(function () {
            _this2.context.store.dispatch({
              type: UIActions.DESTROY_COMPONENT_STATE,
              payload: { persist: persist, hasStore: !!Config.createStore },
              meta: { reduxFractalTriggerComponent: _this2.compKey }
            });
            if (_this2.storeCleanup) {
              _this2.storeCleanup();
            }
            _this2.store = null;
          }, 0);
        }
      }, {
        key: 'render',
        value: function render() {
          if (this.props.store) {
            // eslint-disable-next-line
            console.warn('Props named \'store\' cannot be passed to redux-fractal \'local\'\n                HOC with key ' + this.compKey + ' since it\'s a reserved prop');
          }
          return this.store && _react2.default.createElement(ConnectComp, (0, _extends3.default)({}, this.props, {
            store: this.store
          }));
        }
      }]);
      return UI;
    }(_react2.default.Component);

    UI.contextTypes = (0, _assign2.default)({}, Component.contextTypes, {
      store: _propTypes2.default.shape({
        subscribe: _propTypes2.default.func.isRequired,
        dispatch: _propTypes2.default.func.isRequired,
        getState: _propTypes2.default.func.isRequired
      })
    });
    UI.propTypes = (0, _assign2.default)({}, {
      store: _propTypes2.default.shape({
        subscribe: _propTypes2.default.func.isRequired,
        dispatch: _propTypes2.default.func.isRequired,
        getState: _propTypes2.default.func.isRequired
      })
    });
    var displayName = Component.displayName || Component.name || 'Component';
    UI.displayName = 'local(' + displayName + ')';
    return (0, _hoistNonReactStatics2.default)(UI, Component);
  };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9sb2NhbC5qcyJdLCJuYW1lcyI6WyJVSUFjdGlvbnMiLCJDb25maWciLCJDb21wb25lbnQiLCJkZWZhdWx0TWFwU3RhdGVUb1Byb3BzIiwic3RhdGUiLCJDb25uZWN0Q29tcCIsIm1hcFN0YXRlVG9Qcm9wcyIsIm1hcERpc3BhdGNoVG9Qcm9wcyIsIm1lcmdlUHJvcHMiLCJwcm9wcyIsIm5ld1Byb3BzIiwic3RvcmUiLCJVSSIsImNvbnRleHQiLCJjb21wS2V5Iiwia2V5IiwidW5zdWJzY3JpYmUiLCJleGlzdGluZ1N0YXRlIiwiZ2V0U3RhdGUiLCJsb2NhbCIsInN0b3JlUmVzdWx0IiwiY3JlYXRlU3RvcmUiLCJzdG9yZUNsZWFudXAiLCJjbGVhbnVwIiwiZGlzcGF0Y2giLCJ0eXBlIiwiQ1JFQVRFX0NPTVBPTkVOVF9TVEFURSIsInBheWxvYWQiLCJjb25maWciLCJoYXNTdG9yZSIsIm1ldGEiLCJyZWR1eEZyYWN0YWxUcmlnZ2VyQ29tcG9uZW50IiwicGVyc2lzdCIsInNldFRpbWVvdXQiLCJERVNUUk9ZX0NPTVBPTkVOVF9TVEFURSIsImNvbnNvbGUiLCJ3YXJuIiwiY29udGV4dFR5cGVzIiwic2hhcGUiLCJzdWJzY3JpYmUiLCJmdW5jIiwiaXNSZXF1aXJlZCIsInByb3BUeXBlcyIsImRpc3BsYXlOYW1lIiwibmFtZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7O0lBQVlBLFM7O0FBQ1o7Ozs7OztrQkFFZSxVQUFDQyxNQUFEO0FBQUEsU0FBWSxVQUFDQyxTQUFELEVBQWU7QUFDeEMsUUFBTUMseUJBQXlCLFNBQXpCQSxzQkFBeUIsQ0FBQ0MsS0FBRDtBQUFBLGFBQVdBLEtBQVg7QUFBQSxLQUEvQjtBQUNBLFFBQU1DLGNBQWMseUJBQ2RKLE9BQU9LLGVBQVAsSUFBMEJILHNCQURaLEVBRWRGLE9BQU9NLGtCQUZPLEVB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LFVBQVVtQyxZQUE1QixFQUEwQztBQUMxRDFCLGFBQU8sb0JBQVUyQixLQUFWLENBQWdCO0FBQ3JCQyxtQkFBVyxvQkFBVUMsSUFBVixDQUFlQyxVQURMO0FBRXJCakIsa0JBQVUsb0JBQVVnQixJQUFWLENBQWVDLFVBRko7QUFHckJ2QixrQkFBVSxvQkFBVXNCLElBQVYsQ0FBZUM7QUFISixPQUFoQjtBQURtRCxLQUExQyxDQUFsQjtBQU9BN0IsT0FBRzhCLFNBQUgsR0FBZSxzQkFBYyxFQUFkLEVBQWtCO0FBQy9CL0IsYUFBTyxvQkFBVTJCLEtBQVYsQ0FBZ0I7QUFDckJDLG1CQUFXLG9CQUFVQyxJQUFWLENBQWVDLFVBREw7QUFFckJqQixrQkFBVSxvQkFBVWdCLElBQVYsQ0FBZUMsVUFGSjtBQUdyQnZCLGtCQUFVLG9CQUFVc0IsSUFBVixDQUFlQztBQUhKLE9BQWhCO0FBRHdCLEtBQWxCLENBQWY7QUFPQSxRQUFNRSxjQUFjekMsVUFBVXlDLFdBQVYsSUFBeUJ6QyxVQUFVMEMsSUFBbkMsSUFBMkMsV0FBL0Q7QUFDQWhDLE9BQUcrQixXQUFILGNBQTBCQSxXQUExQjtBQUNBLFdBQU8sb0NBQXFCL0IsRUFBckIsRUFBeUJWLFNBQXpCLENBQVA7QUFDRCxHQWxGYztBQUFBLEMiLCJmaWxlIjoibG9jYWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBpbnZhcmlhbnQgZnJvbSAnaW52YXJpYW50JztcbmltcG9ydCBob2lzdE5vblJlYWN0U3RhdGljcyBmcm9tICdob2lzdC1ub24tcmVhY3Qtc3RhdGljcyc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0ICogYXMgVUlBY3Rpb25zIGZyb20gJy4vYWN0aW9ucy5qcyc7XG5pbXBvcnQgeyBjcmVhdGVTdG9yZSB9IGZyb20gJy4vbG9jYWxSZWR1Y2VyLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgKENvbmZpZykgPT4gKENvbXBvbmVudCkgPT4ge1xuICBjb25zdCBkZWZhdWx0TWFwU3RhdGVUb1Byb3BzID0gKHN0YXRlKSA9PiBzdGF0ZTtcbiAgY29uc3QgQ29ubmVjdENvbXAgPSBjb25uZWN0KFxuICAgICAgICBDb25maWcubWFwU3RhdGVUb1Byb3BzIHx8IGRlZmF1bHRNYXBTdGF0ZVRvUHJvcHMsXG4gICAgICAgIENvbmZpZy5tYXBEaXNwYXRjaFRvUHJvcHMsXG4gICAgICAgIENvbmZpZy5tZXJnZVByb3BzKSgocHJvcHMpID0+IHtcbiAgICAgICAgICBjb25zdCBuZXdQcm9wcyA9IE9iamVjdC5hc3NpZ24oe30sIHByb3BzKTtcbiAgICAgICAgICBkZWxldGUgbmV3UHJvcHMuc3RvcmU7XG4gICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXG4gICAgICAgICAgcmV0dXJuICg8Q29tcG9uZW50IHsuLi5uZXdQcm9wc30gLz4pO1xuICAgICAgICB9KTtcbiAgY2xhc3MgVUkgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzLCBjb250ZXh0KSB7XG4gICAgICBzdXBlcihwcm9wcywgY29udGV4dCk7XG4gICAgICBjb25zdCBjb21wS2V5ID0gdHlwZW9mIENvbmZpZy5rZXkgPT09ICdmdW5jdGlvbicgP1xuICAgICAgICAgICAgICAgIENvbmZpZy5rZXkocHJvcHMsIGNvbnRleHQpIDogQ29uZmlnLmtleTtcbiAgICAgIHRoaXMuc3RvcmUgPSBudWxsO1xuICAgICAgaW52YXJpYW50KENvbmZpZy5rZXksXG4gICAgICdbcmVkdXgtZnJhY3RhbF0gLSBZb3UgbXVzdCBzdXBwbHkgYSAga2V5IHRvIHRoZSBjb21wb25lbnQgZWl0aGVyIGFzIGEgZnVuY3Rpb24gb3Igc3RyaW5nJyk7XG4gICAgICB0aGlzLmNvbXBLZXkgPSBjb21wS2V5O1xuICAgICAgdGhpcy51bnN1YnNjcmliZSA9IG51bGw7XG4gICAgfVxuICAgIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcbiAgICAgIGNvbnN0IGV4aXN0aW5nU3RhdGUgPSB0aGlzLmNvbnRleHQuc3RvcmUuZ2V0U3RhdGUoKS5sb2NhbFt0aGlzLmNvbXBLZXldO1xuICAgICAgY29uc3Qgc3RvcmVSZXN1bHQgPSBjcmVhdGVTdG9yZShcbiAgICAgICAgICAgICAgICBDb25maWcuY3JlYXRlU3RvcmUsIHRoaXMucHJvcHMsXG4gICAgICAgICAgICAgICAgdGhpcy5jb21wS2V5LCBleGlzdGluZ1N0YXRlLCB0aGlzLmNvbnRleHQpO1xuICAgICAgdGhpcy5zdG9yZSA9IHN0b3JlUmVzdWx0LnN0b3JlO1xuICAgICAgdGhpcy5zdG9yZUNsZWFudXAgPSBzdG9yZVJlc3VsdC5jbGVhbnVwO1xuICAgICAgdGhpcy5jb250ZXh0LnN0b3JlLmRpc3BhdGNoKHtcbiAgICAgICAgdHlwZTogVUlBY3Rpb25zLkNSRUFURV9DT01QT05FTlRfU1RBVEUsXG4gICAgICAgIHBheWxvYWQ6IHsgY29uZmlnOiBDb25maWcsIHByb3BzOiB0aGlzLnByb3BzLCBzdG9yZTogdGhpcy5zdG9yZSwgaGFzU3RvcmU6ICEhQ29uZmlnLmNyZWF0ZVN0b3JlIH0sXG4gICAgICAgIG1ldGE6IHsgcmVkdXhGcmFjdGFsVHJpZ2dlckNvbXBvbmVudDogdGhpcy5jb21wS2V5IH0sXG4gICAgICB9KTtcbiAgICB9XG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgICBjb25zdCBwZXJzaXN0ID0gdHlwZW9mIENvbmZpZy5wZXJzaXN0ID09PSAnZnVuY3Rpb24nID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQ29uZmlnLnBlcnNpc3QodGhpcy5wcm9wcywgdGhpcy5jb250ZXh0KSA6IENvbmZpZy5wZXJzaXN0O1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMuY29udGV4dC5zdG9yZS5kaXNwYXRjaCh7XG4gICAgICAgICAgdHlwZTogVUlBY3Rpb25zLkRFU1RST1lfQ09NUE9ORU5UX1NUQVRFLFxuICAgICAgICAgIHBheWxvYWQ6IHsgcGVyc2lzdCwgaGFzU3RvcmU6ICEhQ29uZmlnLmNyZWF0ZVN0b3JlIH0sXG4gICAgICAgICAgbWV0YTogeyByZWR1eEZyYWN0YWxUcmlnZ2VyQ29tcG9uZW50OiB0aGlzLmNvbXBLZXkgfVxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKHRoaXMuc3RvcmVDbGVhbnVwKSB7XG4gICAgICAgICAgdGhpcy5zdG9yZUNsZWFudXAoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnN0b3JlID0gbnVsbDtcbiAgICAgIH0sIDApO1xuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICBpZiAodGhpcy5wcm9wcy5zdG9yZSkge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcbiAgICAgICAgY29uc29sZS53YXJuKGBQcm9wcyBuYW1lZCAnc3RvcmUnIGNhbm5vdCBiZSBwYXNzZWQgdG8gcmVkdXgtZnJhY3RhbCAnbG9jYWwnXG4gICAgICAgICAgICAgICAgSE9DIHdpdGgga2V5ICR7dGhpcy5jb21wS2V5fSBzaW5jZSBpdCdzIGEgcmVzZXJ2ZWQgcHJvcGApO1xuICAgICAgfVxuICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICB0aGlzLnN0b3JlICYmIDxDb25uZWN0Q29tcFxuICAgICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHN9XG4gICAgICAgICAgICAgICAgICBzdG9yZT17dGhpcy5zdG9yZX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgKTtcbiAgICB9XG4gICAgfVxuXG4gIFVJLmNvbnRleHRUeXBlcyA9IE9iamVjdC5hc3NpZ24oe30sIENvbXBvbmVudC5jb250ZXh0VHlwZXMsIHtcbiAgICBzdG9yZTogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgIHN1YnNjcmliZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICAgIGRpc3BhdGNoOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgICAgZ2V0U3RhdGU6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgfSksXG4gIH0pO1xuICBVSS5wcm9wVHlwZXMgPSBPYmplY3QuYXNzaWduKHt9LCB7XG4gICAgc3RvcmU6IFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICBzdWJzY3JpYmU6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgICBkaXNwYXRjaDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICAgIGdldFN0YXRlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIH0pLFxuICB9KTtcbiAgY29uc3QgZGlzcGxheU5hbWUgPSBDb21wb25lbnQuZGlzcGxheU5hbWUgfHwgQ29tcG9uZW50Lm5hbWUgfHwgJ0NvbXBvbmVudCc7XG4gIFVJLmRpc3BsYXlOYW1lID0gYGxvY2FsKCR7ZGlzcGxheU5hbWV9KWA7XG4gIHJldHVybiBob2lzdE5vblJlYWN0U3RhdGljcyhVSSwgQ29tcG9uZW50KTtcbn07XG4iXX0=