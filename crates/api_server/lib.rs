use std::net::TcpListener;

use axum::{routing::get, Router};

pub fn add(left: usize, right: usize) -> usize {
    left + right
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn it_works() {
        let result = add(2, 2);
        assert_eq!(result, 4);
    }
}

pub async fn start_api_server(listener: TcpListener) {
    let app = Router::new().route("/", get(|| async { "Hello, World!" }));

    axum::Server::from_tcp(listener)
        .unwrap()
        .serve(app.into_make_service())
        .await
        .unwrap();
}
