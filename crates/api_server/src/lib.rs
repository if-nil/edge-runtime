mod api;
mod response;
use std::net::TcpListener;

use axum::{routing::get, Router};

pub struct ApiServer {
    listener: TcpListener,
    router: Router,
}

impl ApiServer {
    pub fn new(listener: TcpListener) -> Self {
        let router = Router::new().route("/api/files", get(api::files::file_list));
        Self { listener, router }
    }

    pub async fn start(self) {
        axum::Server::from_tcp(self.listener)
            .unwrap()
            .serve(self.router.into_make_service())
            .await
            .unwrap();
    }
}
