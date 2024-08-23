package com.bookaholic.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.bookaholic.backend.model.Editora;
import com.bookaholic.backend.model.Escritor;
import com.bookaholic.backend.repository.EditoraRepository;
import com.bookaholic.backend.repository.EscritorRepository;
import com.bookaholic.backend.repository.LivroRepository;
import com.bookaholic.backend.service.exceptions.NotFoundException;

@Service
public class EscritorEditoraService {

    @Autowired
    EditoraRepository editoraRepository;


    @Autowired
    EscritorRepository escritorRepository;


    public ResponseEntity getEscritorByIdLivro(Long id) {
        return ResponseEntity.ok().body(escritorRepository.findEscritorById_Livro(id));
    }
    
    public ResponseEntity getEditoraByIdLivro(Long id) {
        return ResponseEntity.ok().body(editoraRepository.findEditoraById_Livro(id));
    }

    public ResponseEntity addEscritor(Escritor esc) {
        return ResponseEntity.ok().body(escritorRepository.save(esc));
    }

    public ResponseEntity addEditora(Editora edt) {
        return ResponseEntity.ok().body(editoraRepository.save(edt));
    }

    public List<Editora> findAllEditoras() {
        return editoraRepository.findAll();
    }

    public List<Escritor> findAllEscritores() {
        return escritorRepository.findAll();
    }

    public Escritor findEscritorById(Long id) {
       return escritorRepository.findById(id).orElseThrow(() -> new NotFoundException(id));  
    }

    public Escritor editEscritor(Long id, Escritor esc) {
        Escritor escritor = findEscritorById(id);
        escritor.setNome(esc.getNome());
        escritor.setSobre_autor(esc.getSobre_autor());
        escritor.setData_nascimento(esc.getData_nascimento());
        return escritorRepository.save(escritor);
    }
}