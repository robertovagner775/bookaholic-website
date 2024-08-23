package com.bookaholic.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bookaholic.backend.dto.BiblioDto;
import com.bookaholic.backend.dto.BiblioInsertDto;
import com.bookaholic.backend.model.Biblioteca;
import com.bookaholic.backend.model.ErrorResponse;
import com.bookaholic.backend.model.Imagem;
import com.bookaholic.backend.model.Usuario;
import com.bookaholic.backend.model.enums.Status;
import com.bookaholic.backend.repository.BibliotecaRepository;
import com.bookaholic.backend.repository.ImagemRepository;
import com.bookaholic.backend.repository.UsuarioRepository;

import jakarta.websocket.server.PathParam;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("biblioteca")
public class BibliotecaController {
    
    @Autowired
    ImagemRepository imagemRepository;

    @Autowired
    UsuarioRepository usuarioRepository;

    @Autowired
    BibliotecaRepository bibliotecaRepository;

    Status status;


    @PostMapping("/livros")
    public ResponseEntity<?>  adicionarLivro(@RequestBody BiblioInsertDto biblioDto ) {
        Usuario usuario = usuarioRepository.findById(biblioDto.id_usuario()).get();
        Imagem img = imagemRepository.findById(biblioDto.id_imagem()).get();
        Biblioteca biblioteca = new Biblioteca(null, usuario, img, "sem acesso" );
        if(bibliotecaRepository.existsByUserImagem(biblioDto.id_imagem(), biblioDto.id_usuario()) < 1 ){
            Biblioteca bi = bibliotecaRepository.save(biblioteca);
            return ResponseEntity.ok().body(img);
        }
        return ResponseEntity.status(401).body(new ErrorResponse(401, "Error ao inserir livro" , " verifique se sua assinatura está ativa" ));
    }

    @GetMapping(value = "/{id}/livros")
    public List<BiblioDto> bibliotecaLeituras(@PathParam("id") Long id) {
        return bibliotecaRepository.viewBiblioteca(id);
    }

    /* 
    @PutMapping(value = "statusAndamento")
    public ResponseEntity<?> atualizarStatus(@RequestParam("id") Long id) {
        Biblioteca biblioteca = bibliotecaRepository.findById(id).get();
        biblioteca.setStatus("em andamento");
        return ResponseEntity.ok().body(bibliotecaRepository.save(biblioteca));
    }
    */

    @PutMapping(value = "/{id}/livros")
    public ResponseEntity<?> atualizarStatusFinalizado(@PathParam("id") Long id, @RequestParam("status") String status) {
        Biblioteca biblioteca = bibliotecaRepository.findById(id).get();
        biblioteca.setStatus(status);
        return ResponseEntity.ok().body(bibliotecaRepository.save(biblioteca));
    }

    
}
