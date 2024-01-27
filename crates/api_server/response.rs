use axum::http::Response as HttpResponse;
use axum::{http::StatusCode, response::IntoResponse};
use serde::Serialize;

#[derive(Serialize)]
struct Response<T> {
    code: i32,
    message: String,
    data: T,
}

type Body = axum::body::Full<bytes::Bytes>;
type BodyError = <Self::Body as axum::body::HttpBody>::Error;
impl<T: Serialize> IntoResponse for Response<T> {
    fn into_response(self) -> HttpResponse<Self::Body> {
        let body = match serde_json::to_vec(&self) {
            Ok(data) => axum::body::full(data),
            Err(_) => {
                return HttpResponse::builder()
                    .status(StatusCode::INTERNAL_SERVER_ERROR)
                    .body(axum::body::empty())
                    .unwrap()
            }
        };

        HttpResponse::builder()
            .status(StatusCode::OK)
            .header("content-type", "application/json")
            .body(body)
            .unwrap()
    }
}
