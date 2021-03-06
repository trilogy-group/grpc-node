// Original file: deps/envoy-api/envoy/config/route/v3/route_components.proto

import type { BoolValue as _google_protobuf_BoolValue, BoolValue__Output as _google_protobuf_BoolValue__Output } from '../../../../google/protobuf/BoolValue';
import type { HeaderMatcher as _envoy_config_route_v3_HeaderMatcher, HeaderMatcher__Output as _envoy_config_route_v3_HeaderMatcher__Output } from '../../../../envoy/config/route/v3/HeaderMatcher';
import type { QueryParameterMatcher as _envoy_config_route_v3_QueryParameterMatcher, QueryParameterMatcher__Output as _envoy_config_route_v3_QueryParameterMatcher__Output } from '../../../../envoy/config/route/v3/QueryParameterMatcher';
import type { RuntimeFractionalPercent as _envoy_config_core_v3_RuntimeFractionalPercent, RuntimeFractionalPercent__Output as _envoy_config_core_v3_RuntimeFractionalPercent__Output } from '../../../../envoy/config/core/v3/RuntimeFractionalPercent';
import type { RegexMatcher as _envoy_type_matcher_v3_RegexMatcher, RegexMatcher__Output as _envoy_type_matcher_v3_RegexMatcher__Output } from '../../../../envoy/type/matcher/v3/RegexMatcher';

/**
 * An extensible message for matching CONNECT requests.
 */
export interface _envoy_config_route_v3_RouteMatch_ConnectMatcher {
}

/**
 * An extensible message for matching CONNECT requests.
 */
export interface _envoy_config_route_v3_RouteMatch_ConnectMatcher__Output {
}

export interface _envoy_config_route_v3_RouteMatch_GrpcRouteMatchOptions {
}

export interface _envoy_config_route_v3_RouteMatch_GrpcRouteMatchOptions__Output {
}

export interface _envoy_config_route_v3_RouteMatch_TlsContextMatchOptions {
  /**
   * If specified, the route will match against whether or not a certificate is presented.
   * If not specified, certificate presentation status (true or false) will not be considered when route matching.
   */
  'presented'?: (_google_protobuf_BoolValue);
  /**
   * If specified, the route will match against whether or not a certificate is validated.
   * If not specified, certificate validation status (true or false) will not be considered when route matching.
   */
  'validated'?: (_google_protobuf_BoolValue);
}

export interface _envoy_config_route_v3_RouteMatch_TlsContextMatchOptions__Output {
  /**
   * If specified, the route will match against whether or not a certificate is presented.
   * If not specified, certificate presentation status (true or false) will not be considered when route matching.
   */
  'presented'?: (_google_protobuf_BoolValue__Output);
  /**
   * If specified, the route will match against whether or not a certificate is validated.
   * If not specified, certificate validation status (true or false) will not be considered when route matching.
   */
  'validated'?: (_google_protobuf_BoolValue__Output);
}

/**
 * [#next-free-field: 13]
 */
export interface RouteMatch {
  /**
   * If specified, the route is a prefix rule meaning that the prefix must
   * match the beginning of the *:path* header.
   */
  'prefix'?: (string);
  /**
   * If specified, the route is an exact path rule meaning that the path must
   * exactly match the *:path* header once the query string is removed.
   */
  'path'?: (string);
  /**
   * Indicates that prefix/path matching should be case sensitive. The default
   * is true.
   */
  'case_sensitive'?: (_google_protobuf_BoolValue);
  /**
   * Specifies a set of headers that the route should match on. The router will
   * check the request???s headers against all the specified headers in the route
   * config. A match will happen if all the headers in the route are present in
   * the request with the same values (or based on presence if the value field
   * is not in the config).
   */
  'headers'?: (_envoy_config_route_v3_HeaderMatcher)[];
  /**
   * Specifies a set of URL query parameters on which the route should
   * match. The router will check the query string from the *path* header
   * against all the specified query parameters. If the number of specified
   * query parameters is nonzero, they all must match the *path* header's
   * query string for a match to occur.
   */
  'query_parameters'?: (_envoy_config_route_v3_QueryParameterMatcher)[];
  /**
   * If specified, only gRPC requests will be matched. The router will check
   * that the content-type header has a application/grpc or one of the various
   * application/grpc+ values.
   */
  'grpc'?: (_envoy_config_route_v3_RouteMatch_GrpcRouteMatchOptions);
  /**
   * Indicates that the route should additionally match on a runtime key. Every time the route
   * is considered for a match, it must also fall under the percentage of matches indicated by
   * this field. For some fraction N/D, a random number in the range [0,D) is selected. If the
   * number is <= the value of the numerator N, or if the key is not present, the default
   * value, the router continues to evaluate the remaining match criteria. A runtime_fraction
   * route configuration can be used to roll out route changes in a gradual manner without full
   * code/config deploys. Refer to the :ref:`traffic shifting
   * <config_http_conn_man_route_table_traffic_splitting_shift>` docs for additional documentation.
   * 
   * .. note::
   * 
   * Parsing this field is implemented such that the runtime key's data may be represented
   * as a FractionalPercent proto represented as JSON/YAML and may also be represented as an
   * integer with the assumption that the value is an integral percentage out of 100. For
   * instance, a runtime key lookup returning the value "42" would parse as a FractionalPercent
   * whose numerator is 42 and denominator is HUNDRED. This preserves legacy semantics.
   */
  'runtime_fraction'?: (_envoy_config_core_v3_RuntimeFractionalPercent);
  /**
   * If specified, the route is a regular expression rule meaning that the
   * regex must match the *:path* header once the query string is removed. The entire path
   * (without the query string) must match the regex. The rule will not match if only a
   * subsequence of the *:path* header matches the regex.
   * 
   * [#next-major-version: In the v3 API we should redo how path specification works such
   * that we utilize StringMatcher, and additionally have consistent options around whether we
   * strip query strings, do a case sensitive match, etc. In the interim it will be too disruptive
   * to deprecate the existing options. We should even consider whether we want to do away with
   * path_specifier entirely and just rely on a set of header matchers which can already match
   * on :path, etc. The issue with that is it is unclear how to generically deal with query string
   * stripping. This needs more thought.]
   */
  'safe_regex'?: (_envoy_type_matcher_v3_RegexMatcher);
  /**
   * If specified, the client tls context will be matched against the defined
   * match options.
   * 
   * [#next-major-version: unify with RBAC]
   */
  'tls_context'?: (_envoy_config_route_v3_RouteMatch_TlsContextMatchOptions);
  /**
   * If this is used as the matcher, the matcher will only match CONNECT requests.
   * Note that this will not match HTTP/2 upgrade-style CONNECT requests
   * (WebSocket and the like) as they are normalized in Envoy as HTTP/1.1 style
   * upgrades.
   * This is the only way to match CONNECT requests for HTTP/1.1. For HTTP/2,
   * where Extended CONNECT requests may have a path, the path matchers will work if
   * there is a path present.
   * Note that CONNECT support is currently considered alpha in Envoy.
   * [#comment:TODO(htuch): Replace the above comment with an alpha tag.
   */
  'connect_matcher'?: (_envoy_config_route_v3_RouteMatch_ConnectMatcher);
  'path_specifier'?: "prefix"|"path"|"safe_regex"|"connect_matcher";
}

/**
 * [#next-free-field: 13]
 */
export interface RouteMatch__Output {
  /**
   * If specified, the route is a prefix rule meaning that the prefix must
   * match the beginning of the *:path* header.
   */
  'prefix'?: (string);
  /**
   * If specified, the route is an exact path rule meaning that the path must
   * exactly match the *:path* header once the query string is removed.
   */
  'path'?: (string);
  /**
   * Indicates that prefix/path matching should be case sensitive. The default
   * is true.
   */
  'case_sensitive'?: (_google_protobuf_BoolValue__Output);
  /**
   * Specifies a set of headers that the route should match on. The router will
   * check the request???s headers against all the specified headers in the route
   * config. A match will happen if all the headers in the route are present in
   * the request with the same values (or based on presence if the value field
   * is not in the config).
   */
  'headers': (_envoy_config_route_v3_HeaderMatcher__Output)[];
  /**
   * Specifies a set of URL query parameters on which the route should
   * match. The router will check the query string from the *path* header
   * against all the specified query parameters. If the number of specified
   * query parameters is nonzero, they all must match the *path* header's
   * query string for a match to occur.
   */
  'query_parameters': (_envoy_config_route_v3_QueryParameterMatcher__Output)[];
  /**
   * If specified, only gRPC requests will be matched. The router will check
   * that the content-type header has a application/grpc or one of the various
   * application/grpc+ values.
   */
  'grpc'?: (_envoy_config_route_v3_RouteMatch_GrpcRouteMatchOptions__Output);
  /**
   * Indicates that the route should additionally match on a runtime key. Every time the route
   * is considered for a match, it must also fall under the percentage of matches indicated by
   * this field. For some fraction N/D, a random number in the range [0,D) is selected. If the
   * number is <= the value of the numerator N, or if the key is not present, the default
   * value, the router continues to evaluate the remaining match criteria. A runtime_fraction
   * route configuration can be used to roll out route changes in a gradual manner without full
   * code/config deploys. Refer to the :ref:`traffic shifting
   * <config_http_conn_man_route_table_traffic_splitting_shift>` docs for additional documentation.
   * 
   * .. note::
   * 
   * Parsing this field is implemented such that the runtime key's data may be represented
   * as a FractionalPercent proto represented as JSON/YAML and may also be represented as an
   * integer with the assumption that the value is an integral percentage out of 100. For
   * instance, a runtime key lookup returning the value "42" would parse as a FractionalPercent
   * whose numerator is 42 and denominator is HUNDRED. This preserves legacy semantics.
   */
  'runtime_fraction'?: (_envoy_config_core_v3_RuntimeFractionalPercent__Output);
  /**
   * If specified, the route is a regular expression rule meaning that the
   * regex must match the *:path* header once the query string is removed. The entire path
   * (without the query string) must match the regex. The rule will not match if only a
   * subsequence of the *:path* header matches the regex.
   * 
   * [#next-major-version: In the v3 API we should redo how path specification works such
   * that we utilize StringMatcher, and additionally have consistent options around whether we
   * strip query strings, do a case sensitive match, etc. In the interim it will be too disruptive
   * to deprecate the existing options. We should even consider whether we want to do away with
   * path_specifier entirely and just rely on a set of header matchers which can already match
   * on :path, etc. The issue with that is it is unclear how to generically deal with query string
   * stripping. This needs more thought.]
   */
  'safe_regex'?: (_envoy_type_matcher_v3_RegexMatcher__Output);
  /**
   * If specified, the client tls context will be matched against the defined
   * match options.
   * 
   * [#next-major-version: unify with RBAC]
   */
  'tls_context'?: (_envoy_config_route_v3_RouteMatch_TlsContextMatchOptions__Output);
  /**
   * If this is used as the matcher, the matcher will only match CONNECT requests.
   * Note that this will not match HTTP/2 upgrade-style CONNECT requests
   * (WebSocket and the like) as they are normalized in Envoy as HTTP/1.1 style
   * upgrades.
   * This is the only way to match CONNECT requests for HTTP/1.1. For HTTP/2,
   * where Extended CONNECT requests may have a path, the path matchers will work if
   * there is a path present.
   * Note that CONNECT support is currently considered alpha in Envoy.
   * [#comment:TODO(htuch): Replace the above comment with an alpha tag.
   */
  'connect_matcher'?: (_envoy_config_route_v3_RouteMatch_ConnectMatcher__Output);
  'path_specifier': "prefix"|"path"|"safe_regex"|"connect_matcher";
}
