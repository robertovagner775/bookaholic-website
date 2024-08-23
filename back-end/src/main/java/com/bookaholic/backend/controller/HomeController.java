package com.bookaholic.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bookaholic.backend.service.EscritorEditoraService;

import jakarta.websocket.server.PathParam;

import com.bookaholic.backend.model.Editora;
import com.bookaholic.backend.model.Escritor;
import com.bookaholic.backend.model.Imagem;
import com.bookaholic.backend.model.LivroDto;
import com.bookaholic.backend.repository.ImagemRepository;
import com.bookaholic.backend.repository.LivroRepository;




@RestController
public class HomeController {

    @Autowired
    public EscritorEditoraService EscritorEditoraService;
    
    @Autowired
    public LivroRepository livroRepository;

    @Autowired
    private ImagemRepository imagemRepository;
    
    @GetMapping("/livros/imagens")
    public List<LivroDto> viewLivros() {
        return imagemRepository.findAllJoinBook();
    }

    @GetMapping("/livros/title")
    public List<LivroDto> viewTitulo(@RequestParam(value="titulo") String titulo) {
        return imagemRepository.findAllByTitle(titulo);
    }


    @GetMapping(value = "/livros/{id}/escritores")
    public ResponseEntity<Escritor> getEscritorLivro(@PathVariable Long id) {
        return EscritorEditoraService.getEscritorByIdLivro(id);
    }

    @GetMapping(value = "/livros/{id}/editoras")
    public ResponseEntity<Editora> getEditoraLivro(@PathVariable Long id) {
        return EscritorEditoraService.getEditoraByIdLivro(id);
    }
    

    @GetMapping(value = "/livros/{id}/imagens")
    public LivroDto viewLivroAvaliacao(@PathVariable Long id) {
        
        return imagemRepository.findAllByIdBook(id);
    }

    @GetMapping("/livros/ordem-alfabetica")
    public List<LivroDto> viewLivroAlfabetica() {
        return imagemRepository.findAllJoinBookDois();
    }
     
    @GetMapping("/livros/{titulo}/categorias")
    public List<LivroDto> viewLivroCategoria(@PathVariable String titulo) {
        return imagemRepository.findAllByBook(titulo);
    }

    
}
