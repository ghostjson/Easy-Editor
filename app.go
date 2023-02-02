package main

import (
	"context"
	"fmt"
	"log"
	"os"
)

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
	log.Println("Application is started")
}

// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}

func (a *App) OpenFile(filePath string) string {
	data, err := os.ReadFile(filePath)
	if err != nil {
		log.Panicln("Not able to open file", err)
		return ""
	}

	return string(data)
}

func (a *App) SaveFile(filePath, contents string) bool {
	err := os.WriteFile(filePath, []byte(contents), 0644)
	if err != nil {
		log.Panicln("Not able to save file", err)
		return false
	}

	return true
}
