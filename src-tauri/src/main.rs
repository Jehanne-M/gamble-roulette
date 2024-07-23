// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod structures;
use serde_json::from_reader;
use std::{fs::File, io::BufReader, path::Path};
use structures::items::Items;

use tauri::api::path::document_dir;

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![save_settings, read_settings])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
async fn save_settings(settings: String) -> Result<(), String> {
    if let Some(dir) = document_dir() {
        let path = dir.join("settings.json");
        println!("{:?}", path);
        std::fs::write(path, settings).map_err(|err| err.to_string())?;
        Ok(())
    } else {
        Err("Could not find document directory".into())
    }
}

#[tauri::command]
async fn read_settings(path: &str) -> Result<Vec<Items>, String> {
    let json_path = Path::new(path);
    let json_file = File::open(json_path).unwrap();
    println!("{:?}", json_file);
    let reader: BufReader<File> = BufReader::new(json_file);
    from_reader(reader).map_err(|e| e.to_string())
}
