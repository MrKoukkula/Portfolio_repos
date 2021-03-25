package fi.koodikoukku.conference.controllers;

import fi.koodikoukku.conference.models.Session;
import fi.koodikoukku.conference.repositories.SessionRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sessions")
public class SessionsController {

    @Autowired
    private SessionRepository sessionRepository;

    // When address above gets just a get request, it maps to this function
    @GetMapping
    public List<Session> list() {
        return sessionRepository.findAll();
    }

    // If address above has id in its path, we search repo for the id entry
    @GetMapping
    @RequestMapping("{id}")
    public Session get(@PathVariable Integer id) {
        return sessionRepository.getOne(id);
    }

    @PostMapping
    public Session create(@RequestBody Session session) {
        return sessionRepository.saveAndFlush(session);
    }

    @RequestMapping(value = "{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable Integer id) {
        //TODO Also needs to check for children records before deleting. Edit: Check if Cascade.All works at Entity
        sessionRepository.deleteById(id);
    }

    @RequestMapping(value = "{id}", method = RequestMethod.PUT)
    public Session update(@PathVariable Integer id, @RequestBody Session session) {
        //TODO Add validation the check if all required fields are there in the session
        Session existingSession = sessionRepository.getOne(id);
        BeanUtils.copyProperties(session, existingSession, "sessionId");
        return sessionRepository.saveAndFlush(existingSession);
    }
}
