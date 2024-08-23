package com.bookaholic.backend.service;



import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.LockedException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.bookaholic.backend.config.TokenService;
import com.bookaholic.backend.dto.EmailDto;
import com.bookaholic.backend.dto.TokenDTO;
import com.bookaholic.backend.model.ConfirmationToken;
import com.bookaholic.backend.model.ErrorResponse;
import com.bookaholic.backend.model.LoginDto;
import com.bookaholic.backend.model.Usuario;
import com.bookaholic.backend.repository.ConfirmationTokenRepository;
import com.bookaholic.backend.repository.RoleRepository;
import com.bookaholic.backend.repository.UsuarioRepository;

@Service
public class UsuarioService {
    

    private UsuarioRepository repositorio;
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticateManager;

    
    @Autowired
    private TokenService tokenService;

    @Autowired
    private EmailService emailService;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    ConfirmationTokenRepository confirmationTokenRepository;

    
    @Autowired
    private JavaMailSender mailSender;


    @Autowired
    public UsuarioService(UsuarioRepository repositorio) {
        this.repositorio = repositorio;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }


    public ResponseEntity<?> autenticarUsuario(LoginDto login) {

        try{
            UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(login.email(), login.senha());
            Authentication authenticate = this.authenticateManager.authenticate(usernamePasswordAuthenticationToken);
            var usuario = (Usuario) authenticate.getPrincipal();
            

            var token = tokenService.generateToken(usuario);
            String position;
            if(usuario.getAuthorities().toString().equals("[ROLE_LEITOR]")) {
                position = "LEITOR";
            } else if(usuario.getAuthorities().toString().equals("[ROLE_USER]")) {
                position = "USER";
            } else {
                position = "ADMIN";
            }
            
            TokenDTO tokenDto = new TokenDTO(usuario.getId() , usuario.getName(),token,  position);
           
            return ResponseEntity.status(200).body(tokenDto);
        }catch(UsernameNotFoundException text){
            return ResponseEntity.status(200).body(new ErrorResponse(401, "NOT-FOUND", ""+text.getMessage()));
        }
        catch (BadCredentialsException ex) {
            return ResponseEntity.status(200).body(new ErrorResponse(401, "NOT-FOUND", ""+ex.getMessage()));
        } catch (LockedException ex) {
            return ResponseEntity.status(200).body(new ErrorResponse(401, "Erro: Conta Bloqueada", ""+ex.getMessage()));
        } catch (DisabledException ex) {
            return ResponseEntity.status(200).body(new ErrorResponse(401, "CONFIRM-ACCOUNT", ""+ex.getMessage()));
        }  catch (AuthenticationException ex) {
            return ResponseEntity.status(200).body(new ErrorResponse(401, "NOT-AUTHORIZATION", ""+ex.getMessage()));
        }

    }

    public ResponseEntity<?> criarUsuario(Usuario usuario) {
        String encoder = this.passwordEncoder.encode(usuario.getSenha());
        usuario.setSenha(encoder);
      
       
         if (repositorio.existsByEmail(usuario.getEmail())) {
            return ResponseEntity.badRequest().body("Error: Email is already in use!");
        }

        usuario.setRoles(Arrays.asList(roleRepository.findByName("ROLE_USER")));

        repositorio.save(usuario);

        ConfirmationToken confirmationToken = new ConfirmationToken(usuario);

        confirmationTokenRepository.save(confirmationToken);

        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo(usuario.getEmail());
       
        mailMessage.setSubject("Complete Registration!");
        mailMessage.setText("To confirm your account, please click here  "
                +"http://localhost:8080/usuario/confirm-account?token="+confirmationToken.getConfirmationToken());
        emailService.sendEmail(mailMessage);

        System.out.println("Confirmation Token: " + confirmationToken.getConfirmationToken());

        return ResponseEntity.ok(new EmailDto("Um codigo de confirmação foi enviado para seu email. "));
        

         
    
       
    }

    public ResponseEntity<?> confirmEmail(String confirmationToken) {
        ConfirmationToken token = confirmationTokenRepository.findByConfirmationToken(confirmationToken);

        if(token != null)
        {
            Usuario usuario = repositorio.findByEmailQuery(token.getUsuario().getEmail());
            usuario.setEnabled(true);
            repositorio.save(usuario);
            return ResponseEntity.ok("Email verified successfully!");
        }
        return ResponseEntity.badRequest().body("Error: Couldn't verify email");
    }

    public Usuario viewEmail(String email) {
        return repositorio.findByEmailQuery(email);
    }
    public Usuario viewUsername(String username) {
        return repositorio.findByUsername(username);
    }
 
    public Boolean validarSenha(Usuario usuario) {
        String senha = repositorio.getReferenceById(usuario.getId()).getSenha();
        String senha2 = usuario.getSenha();
       
        Boolean valid = this.passwordEncoder.matches(senha, senha2);
        return valid;
    }
    public String hash(String senha) {
        String cod = passwordEncoder.encode(senha);
        return cod; 
    }


}
